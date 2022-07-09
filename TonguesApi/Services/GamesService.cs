using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TonguesApi.Services;

public class GamesService{
    private readonly IMongoCollection<GameBucket> _gameBucketsCollection;
    private readonly IMongoCollection<UserGameBucket> _userGameCollection;
    private readonly IMongoCollection<Game> _gamesCollection;
    public GamesService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);

        _gameBucketsCollection = mongoDatabase.GetCollection<GameBucket>(
            TonguesDatabaseSettings.Value.GameBucketsCollectionName);

        _userGameCollection = mongoDatabase.GetCollection<UserGameBucket>(
            TonguesDatabaseSettings.Value.UserGameBucketsCollectionName);

        _gamesCollection = mongoDatabase.GetCollection<Game>(
            TonguesDatabaseSettings.Value.GamesCollectionName);
    }

    public async Task<GameBucket> GetBucketAsync(string id) =>
        await _gameBucketsCollection.Find(x => x.Id==id).FirstOrDefaultAsync();
    public async Task CreateBucketAsync(GameBucket newGameBucket) =>
        await _gameBucketsCollection.InsertOneAsync(newGameBucket);
    public async Task UpdateBucketAsync(string id, GameBucket updatedGame) =>
        await _gameBucketsCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);
    public async Task RemoveBucketAsync(string id) =>
        await _gameBucketsCollection.DeleteOneAsync(x => x.Id == id);
    public async Task<GameBucket> GetBucketHead(int language1, int language2)=>
        await _gameBucketsCollection.Find(x=> x.LearningLanguageId==language1&&x.NativeLanguageId==language2).FirstOrDefaultAsync();



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