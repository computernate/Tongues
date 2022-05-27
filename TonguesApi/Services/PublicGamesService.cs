using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TonguesApi.Services;

public class PublicGamesService{
    private readonly IMongoCollection<PublicGame> _gamesCollection;
    public PublicGamesService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);

        _gamesCollection = mongoDatabase.GetCollection<PublicGame>(
            TonguesDatabaseSettings.Value.PublicGamesCollectionName);
    }

    public async Task<List<PublicGame>> GetAsync() =>
        await _gamesCollection.Find(_ => true).ToListAsync();

    public async Task<PublicGame?> GetAsync(string id) =>
        await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(PublicGame newPublicGameGame) =>
        await _gamesCollection.InsertOneAsync(newPublicGameGame);

    public async Task UpdateAsync(string id, PublicGame updatedGame) =>
        await _gamesCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);

    public async Task RemoveAsync(string id) =>
        await _gamesCollection.DeleteOneAsync(x => x.Id == id);

}