using TonguesApi.Models;
using TonguesApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace TonguesApi.Services;

public class WordsService{
    private readonly IMongoCollection<WordBucket> _wordCollection;
    public WordsService(IOptions<TonguesDatabaseSettings> TonguesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TonguesDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(
            TonguesDatabaseSettings.Value.DatabaseName);
        _wordCollection = mongoDatabase.GetCollection<WordBucket>(
            TonguesDatabaseSettings.Value.WordsCollectionName);
    }

    //Lists all the word buckets
    public async Task<List<WordBucket>> GetAsync() =>
        await _wordCollection.Find(_ => true).ToListAsync();

    //Gets a specific user by their ID
    public async Task<WordBucket?> GetAsync(string id) =>
        await _wordCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    //Creates a new user
    public async Task CreateAsync(WordBucket newWordBucket) =>
        await _wordCollection.InsertOneAsync(newWordBucket);

    //Updates a user based on their ID
    public async Task UpdateAsync(string id, WordBucket updatedBucket) =>
        await _wordCollection.ReplaceOneAsync(x => x.Id == id, updatedBucket);

    //Deletes a user
    public async Task RemoveAsync(string id) =>
        await _wordCollection.DeleteOneAsync(x => x.Id == id);
}