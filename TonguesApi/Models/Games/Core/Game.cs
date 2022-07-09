using MongoDB.Bson.Serialization.Attributes;
namespace TonguesApi.Models;

public class GameBucketStorage{
    public string Id {get;set;} = string.Empty;
    public int Index {get;set;} = 0;
    public GameBucketStorage(string id, int index){
        this.Id = id;
        this.Index = index;
    }
    public GameBucketStorage() {}
}


[BsonKnownTypes(typeof(NextLine))]
public abstract class Game{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]    
    public string Id = string.Empty;
    public string HostId = string.Empty;
    public string gameBucketId = string.Empty;
    public int gameBucketIndex = 0;
    public int LearningLanguage = 0;
    public GameBucketStorage sourceGameBucket = null;
    public List<GameBucketStorage> userBuckets = new List<GameBucketStorage>();
    public abstract UserGameBasic GetBasicUser();
}