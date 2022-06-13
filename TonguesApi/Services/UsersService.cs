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

    //Lists all the users
    public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    //Gets a specific user by their ID
    public async Task<User?> GetAsync(string id) =>
        await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    //Creates a new user
    public async Task CreateAsync(User newPublicUser) =>
        await _usersCollection.InsertOneAsync(newPublicUser);

    //Updates a user based on their ID
    public async Task UpdateAsync(string id, User updatedUser) =>
        await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    //Deletes a user
    public async Task RemoveAsync(string id) =>
        await _usersCollection.DeleteOneAsync(x => x.Id == id);

    //Gets all words based on a user's ID
    public async Task<List<Word>> GetWordsAsync(string id) =>
        await _usersCollection.Find(x => x.Id == id)
            .Project(u => u.Words)
            .FirstOrDefaultAsync();

    //Updates a user's wordlist
    public async Task UpdateWordsAsync(string id, List<Word> wordList) {
        var update = Builders<User>.Update.Set(x => x.Words, wordList);
        await _usersCollection.FindOneAndUpdateAsync(x => x.Id == id, update);
    }
}