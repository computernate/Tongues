using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class WordBucket{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id {get; set;} = string.Empty;
    public int Language1 {get; set;} = 0;
    public int Language2 {get; set;} = 0;
    public string NextBucketId {get; set;} = string.Empty;
    public string LastBucketId {get; set;} = string.Empty;
    public string UserId {get; set;} = string.Empty;
    public List<Word> Words {get; set;} = new List<Word>();

    public WordBucket(WordBucket oldBucket, Word? firstWord){
        this.Language1 = oldBucket.Language1;
        this.Language2 = oldBucket.Language2;
        this.NextBucketId = oldBucket.Id;
        this.UserId = oldBucket.UserId;
        if(firstWord != null) this.Words.Add(firstWord);
    }
    public WordBucket(){
        this.NextBucketId = "";
    }
}