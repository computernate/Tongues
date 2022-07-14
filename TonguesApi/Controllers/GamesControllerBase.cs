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



    public async Task AddGame(GameBasic game, string userId, int targetLanguage){
        User user = await _usersService.GetIdAsync(userId);

        game.HostId = user.Id;
        List<GameBucketStorage> bucketList = new List<GameBucketStorage>();
        GameBucket headBucket;

        foreach(UserLanguage language in user.NativeLanguages){
            //Get the head bucket, so we can know where to add the game publically
            headBucket = await _gamesService.GetBucketHead(language.language, targetLanguage);

            if(headBucket == null){
                headBucket = new GameBucket(targetLanguage, language.language, "");
                await _gamesService.CreateBucketAsync(headBucket);
            }
            else if(headBucket.gamesList.Count > gameBucketLength){
                //If the bucket is full, create a new bucket and add the game
                headBucket = new GameBucket(targetLanguage, language.language, headBucket.Id);
                await _gamesService.CreateBucketAsync(headBucket);
            }
            bucketList.Add(new GameBucketStorage(headBucket.Id, headBucket.gamesList.Count));
        }

        game.gameBuckets = bucketList;

        foreach(GameBucketStorage storage in bucketList){
            headBucket = await _gamesService.GetBucketAsync(storage.Id);
            headBucket.gamesList.Add(game);
            await _gamesService.UpdateBucketAsync(headBucket.Id, headBucket);
        }
    }




    //
    public async Task UpdateBucketReferences(Game game){
        GameBucket gameBucket = await _gamesService.GetBucketAsync(game.sourceGameBucket.Id);
        GameBasic basicGame = gameBucket.gamesList[game.sourceGameBucket.Index];

        foreach(GameBucketStorage storage in basicGame.gameBuckets){
            gameBucket = await _gamesService.GetBucketAsync(storage.Id);
            gameBucket.gamesList[storage.Index] = basicGame;
            await _gamesService.UpdateBucketAsync(gameBucket.Id, gameBucket);
        }
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

        //Update game in buckets
        await UpdateBucketReferences(game);
        
        //Update user
        GameBucketStorage user1Storage = await JoinGame(userId, game.GetBasicUser());
        GameBucketStorage hostStorage = await JoinGame(game.HostId, game.GetBasicUser());

        //Update Game
        game.userBuckets.Add(user1Storage);
        game.userBuckets.Add(hostStorage);
        
        await _gamesService.UpdateGameAsync(game.Id, game);
    }

    public async Task<GameBucketStorage> JoinGame(string userId, UserGameBasic gameBasic){

        User user = await _usersService.GetIdAsync(userId);
        GameBucket bucket = await _gamesService.GetBucketAsync(gameBasic.sourceGameBucket.Id);

        //Add the game to the user
        UserBucketData? userData = user.GameBuckets.Find(x => x.LanguageId == bucket.LearningLanguageId);
        UserGameBucket? userBucketHead;
        if(userData != null){
            userBucketHead = await _gamesService.GetUserGameBucketAsync(userData.GameId);
        }
        else{
            userBucketHead = null;
        }
        if(userBucketHead == null || userBucketHead.gamesList.Count > gameBucketLength){
            if(userBucketHead == null){
                userBucketHead = new UserGameBucket(userId, bucket.LearningLanguageId);
            }
            else{
                userBucketHead = new UserGameBucket(userBucketHead);
            }
            userBucketHead.gamesList.Add(gameBasic);
            await _gamesService.CreateUserGameBucketAsync(userBucketHead);
            //Replace the user's bucket
            user.GameBuckets.RemoveAll(x => x.LanguageId == bucket.LearningLanguageId);
            user.GameBuckets.Add(new UserBucketData(userBucketHead.Id, bucket.LearningLanguageId));
        }

        else{
            //Otherwise, just add to the user bucket
            userBucketHead.gamesList.Add(gameBasic);
            await _gamesService.UpdateUserGameBucketAsync(userBucketHead.Id, userBucketHead);
        }
        await _usersService.UpdateAsync(user.Id, user);
        return new GameBucketStorage(userBucketHead.Id, userBucketHead.gamesList.Count-1);
    }

    public async Task MakeGameUnpublic(GameBasic game){
        GameBucket gameBucket;
        foreach(GameBucketStorage storageBucket in game.gameBuckets){
            gameBucket = await _gamesService.GetBucketAsync(storageBucket.Id);
            gameBucket.gamesList[storageBucket.Index].IsDeleted = true;
            await _gamesService.UpdateBucketAsync(gameBucket.Id, gameBucket);
        }
    }
}