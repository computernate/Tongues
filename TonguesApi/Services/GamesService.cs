using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TonguesApi.Services;

public class GamesService{
    private readonly IMongoCollection<GameParent> _gameParentsCollection;
    private readonly IMongoCollection<UserGameBucket> _userGameCollection;
    private readonly IMongoCollection<Game> _gamesCollection;
    public GamesService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);

        _gameParentsCollection = mongoDatabase.GetCollection<GameParent>(
            TonguesDatabaseSettings.Value.GameParentsCollectionName);

        _userGameCollection = mongoDatabase.GetCollection<UserGameBucket>(
            TonguesDatabaseSettings.Value.UserGameBucketsCollectionName);

        _gamesCollection = mongoDatabase.GetCollection<Game>(
            TonguesDatabaseSettings.Value.GamesCollectionName);
    }

    public async Task<List<GameParent>> GetParentsAsync(int start, List<int> learningLanguages, int nativeLanguage){
        //NOTE: Here, learninglangauge is the HOST'S learning languages. 
        return await _gameParentsCollection.Find(
            x => (learningLanguages == null || learningLanguages.Contains(x.LearningLanguage)) && 
            (nativeLanguage == null || x.NativeLanguages.Contains(nativeLanguage))
            ).Sort("{lastUpdated: 1}").Skip(start).Limit(25).ToListAsync();
    }
    public async Task<GameParent> GetParentAsync(string id) =>
        await _gameParentsCollection.Find(x => x.Id==id).FirstOrDefaultAsync();
    public async Task CreateParentAsync(GameParent newGameBucket) =>
        await _gameParentsCollection.InsertOneAsync(newGameBucket);
    public async Task UpdateParentAsync(string id, GameParent updatedGame) =>
        await _gameParentsCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);
    public async Task RemoveParentAsync(string id) =>
        await _gameParentsCollection.DeleteOneAsync(x => x.Id == id);



    public async Task<UserGameBucket> GetUserGameBucketAsync(string id) =>
        await _userGameCollection.Find(x => x.Id==id).FirstOrDefaultAsync();
    public async Task CreateUserGameBucketAsync(UserGameBucket newGameBucket) =>
        await _userGameCollection.InsertOneAsync(newGameBucket);
    public async Task UpdateUserGameBucketAsync(string id, UserGameBucket updatedGame) =>
        await _userGameCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);


    public async Task<List<Game>> GetGamesAsync() =>
        await _gamesCollection.Find(_ => true).ToListAsync();

    //Gets a specific user by their ID
    public async Task<Game?> GetGameAsync(string id) =>
        await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    //Creates a new user
    public async Task CreateGameAsync(Game game) =>
        await _gamesCollection.InsertOneAsync(game);

    //Updates a user based on their ID
    public async Task UpdateGameAsync(string id, Game game) =>
        await _gamesCollection.ReplaceOneAsync(x => x.Id == id, game);

    //Deletes a user
    public async Task RemoveGameAsync(string id) =>
        await _gamesCollection.DeleteOneAsync(x => x.Id == id);

}