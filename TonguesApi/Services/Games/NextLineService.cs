using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace TonguesApi.Services;

public class NextLineService{
    private readonly IMongoCollection<NextLine> _gamesCollection;
    public NextLineService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);
        _gamesCollection = mongoDatabase.GetCollection<NextLine>(
            TonguesDatabaseSettings.Value.GamesCollectionName);
    }

    //Gets a specific game by their ID
    public async Task<NextLine?> GetAsync(string id) =>
        await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    //Creates a new user
    public async Task CreateAsync(NextLine newGame) =>
        await _gamesCollection.InsertOneAsync(newGame);

    //Updates a user based on their ID
    public async Task UpdateAsync(string id, NextLine updateGame) =>
        await _gamesCollection.ReplaceOneAsync(x => x.Id == id, updateGame);

    //Deletes a user
    public async Task RemoveAsync(string id) =>
        await _gamesCollection.DeleteOneAsync(x => x.Id == id);
}