using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TonguesApi.Services;

public class GamesService{
    private readonly IMongoCollection<GameBase> _gamesCollection;
    public GamesService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);

        _gamesCollection = mongoDatabase.GetCollection<GameBase>(
            TonguesDatabaseSettings.Value.GamesCollectionName);
    }

    public async Task<List<GameBase>> GetAsync(int start, int limit, List<int> languages) =>
        await _gamesCollection.Find(x => languages.Contains(x.OwnerLanguage) && x.isPublic == true)
            .Skip(start)
            .Limit(limit)
            .ToListAsync();
    public async Task<List<GameBase>> GetAsync(int start, int limit, int language) =>
        await _gamesCollection.Find(x => x.OwnerLanguage == language && x.isPublic == true)
            .Skip(start)
            .Limit(limit)
            .ToListAsync();

    public async Task<GameBase?> GetAsync(string id) =>
        await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(GameBase newGameGame) =>
        await _gamesCollection.InsertOneAsync(newGameGame);

    public async Task UpdateAsync(string id, GameBase updatedGame) =>
        await _gamesCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);

    public async Task RemoveAsync(string id) =>
        await _gamesCollection.DeleteOneAsync(x => x.Id == id);

}