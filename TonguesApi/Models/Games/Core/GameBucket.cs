using MongoDB.Bson.Serialization.Attributes;
namespace TonguesApi.Models;

public class GameBucket{

    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]  
    public string Id {get; set;} = string.Empty;
    public string NextBucketId = string.Empty;
    public int LearningLanguageId {get; set;} = 0;
    public int NativeLanguageId {get; set;} = 0;
    public List<GameBasic> gamesList = new List<GameBasic>();
    public GameBucket(int native, int learning, string nextBucketId){
        this.LearningLanguageId=learning;
        this.NativeLanguageId=native;
        this.NextBucketId = nextBucketId;
    }
}

[BsonKnownTypes(typeof(NextLineGameBasic))]
public class GameBasic{
    public List<GameBucketStorage> gameBuckets = new List<GameBucketStorage>();
    public string HostId {get; set;}  = string.Empty;
    public bool IsDeleted {get; set;}  = false;
    public int Type {get; set;} = 0;
}