using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class UserBucketData{
    public string GameId = string.Empty;
    public int LanguageId = 0;
    public UserBucketData(string id, int language){
        this.GameId = id;
        this.LanguageId = language;
    }
}


public class User{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public List<UserLanguage> NativeLanguages {get; set;} = new List<UserLanguage>();
    public List<UserLanguage> LearningLanguages {get; set;} = new List<UserLanguage>();

    //Note: WordBuckets only contain the first word bucket in each language. IE: Bucket 1 for Japanese, bucket 1 for Spanish, etc.
    public List<BasicWordBucket> WordBuckets {get; set;} = new List<BasicWordBucket>();
    public List<UserBucketData> GameBuckets {get; set;} = new List<UserBucketData>();
    public int WordModifier = 5;
    public int AllowedWords = 20;
}