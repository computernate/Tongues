using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace TonguesApi.Services;

public class UsersService{
    private readonly IMongoCollection<User> _usersCollection;
    public UsersService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        Console.WriteLine(TonguesDatabaseSettings.Value.ConnectionString);
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);
        _usersCollection = mongoDatabase.GetCollection<User>(
            TonguesDatabaseSettings.Value.UsersCollectionName);
    }

    public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User newPublicUser) =>
        await _usersCollection.InsertOneAsync(newPublicUser);

    public async Task UpdateAsync(string id, User updatedUser) =>
        await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _usersCollection.DeleteOneAsync(x => x.Id == id);

    public async Task<List<Word>> GetWordsAsync(string id) =>
        await _usersCollection.Find(x => x.Id == id)
            .Project(u => u.Words)
            .FirstOrDefaultAsync();
    public async Task UpdateWordsAsync(string id, List<Word> wordList) {
        var update = Builders<User>.Update.Set(x => x.Words, wordList);
        await _usersCollection.FindOneAndUpdateAsync(x => x.Id == id, update);
    }
}