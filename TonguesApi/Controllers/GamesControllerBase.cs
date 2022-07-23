using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

public class GamesControllerBase : ControllerBase
{
    protected readonly GamesService _gamesService;
    protected readonly UsersService _usersService;
    private const int gameBucketLength = 25;

    public GamesControllerBase(GamesService gamesService, UsersService usersService) {
        this._gamesService = gamesService;
        this._usersService = usersService;
    }



    public async Task AddGame(GameParent game, string userId, int targetLanguage){
        Console.WriteLine(userId);
        User user = await _usersService.GetIdAsync(userId);
        game.HostId = userId;
        game.created=DateTime.Now;
        game.lastUpdated=DateTime.Now;
        game.LearningLanguage=targetLanguage;
        foreach(UserLanguage language in user.NativeLanguages){
            game.NativeLanguages.Add(language.language);
        }

        await _gamesService.CreateParentAsync(game);
    }
    

    public async Task UpdateUsers(Game game){
        UserGameBucket userBucket;
        foreach(GameBucketStorage storageBucket in game.userBuckets){
            userBucket = await _gamesService.GetUserGameBucketAsync(storageBucket.Id);
            userBucket.gamesList[storageBucket.Index] = game.GetBasicUser();
            await _gamesService.UpdateUserGameBucketAsync(userBucket.Id, userBucket);
        }
    }


    public async Task JoinChatGameWithUser(Game game, string userId){
        //Create game
        await _gamesService.CreateGameAsync(game);
        
        //Update user
        GameBucketStorage user1Storage = await JoinGame(userId, game);
        GameBucketStorage hostStorage = await JoinGame(game.HostId, game);

        //Update Game
        game.userBuckets.Add(user1Storage);
        game.userBuckets.Add(hostStorage);
        
        await _gamesService.UpdateGameAsync(game.Id, game);
    }

    public async Task<GameBucketStorage> JoinGame(string userId, Game game){

        User user = await _usersService.GetIdAsync(userId);
        GameParent parent = await _gamesService.GetParentAsync(game.parent);

        //Add the game to the user
        UserBucketData? userData = user.GameBuckets.Find(x => x.LanguageId == parent.LearningLanguage);
        UserGameBucket? userBucketHead;
        if(userData != null){
            userBucketHead = await _gamesService.GetUserGameBucketAsync(userData.GameId);
        }
        else{
            userBucketHead = null;
        }
        if(userBucketHead == null || userBucketHead.gamesList.Count > gameBucketLength){
            if(userBucketHead == null){
                userBucketHead = new UserGameBucket(userId, parent.LearningLanguage);
            }
            else{
                userBucketHead = new UserGameBucket(userBucketHead);
            }
            userBucketHead.gamesList.Add(game.GetBasicUser());
            await _gamesService.CreateUserGameBucketAsync(userBucketHead);
            //Replace the user's bucket
            user.GameBuckets.RemoveAll(x => x.LanguageId == parent.LearningLanguage);
            user.GameBuckets.Add(new UserBucketData(userBucketHead.Id, parent.LearningLanguage));
        }

        else{
            //Otherwise, just add to the user bucket
            userBucketHead.gamesList.Add(game.GetBasicUser());
            await _gamesService.UpdateUserGameBucketAsync(userBucketHead.Id, userBucketHead);
        }
        await _usersService.UpdateAsync(user.Id, user);
        return new GameBucketStorage(userBucketHead.Id, userBucketHead.gamesList.Count-1);
    }

    public async Task MakeGameUnpublic(GameParent game){
        game.IsPublic = false;
        await _gamesService.UpdateParentAsync(game.Id, game);
    }
}