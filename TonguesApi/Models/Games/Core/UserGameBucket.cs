using MongoDB.Bson.Serialization.Attributes;
namespace TonguesApi.Models;

/*
    The bucket holds a list of games. Each one is very small, and shouldn't hold more than
    a reference to the game / review of a game played, and a few notifications. This way, 
    the user can easily paginate their list of games and scroll through them.
*/
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
    public string parent = string.Empty;
    public string gameSourceId = string.Empty;
    public int notificaitons{get;set;}=0;
}