using MongoDB.Bson.Serialization.Attributes;
namespace TonguesApi.Models;

public class UserGameBucket{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]    
    public string Id {get; set;} = string.Empty;
    public string UserId {get; set;} = string.Empty;
    public int LearningLanguageId {get; set;} = 0;
    public List<UserGameBasic> gamesList = new List<UserGameBasic>();
    public UserGameBucket(UserGameBucket oldBucket){
        this.UserId = oldBucket.UserId;
        this.LearningLanguageId = oldBucket.LearningLanguageId;
    }
    public UserGameBucket(string userId, int language){
        this.UserId=userId;
        this.LearningLanguageId = language;
    }
}

public class UserGameBasic{
    public GameBucketStorage sourceGameBucket = null;
    public string gameSourceId = string.Empty;
    public int notificaitons{get;set;}=0;
}