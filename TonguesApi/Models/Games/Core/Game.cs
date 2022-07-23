using MongoDB.Bson.Serialization.Attributes;
namespace TonguesApi.Models;

/*
The game is an INSTANCE of a game. This means that if there is a game object, there are users who can play
and are currently playing it. This object is the base class that all other games inherit from.
*/
[BsonKnownTypes(typeof(NextLine))]
public abstract class Game{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]    
    public string Id = string.Empty;
    public string HostId = string.Empty;
    public string gameBucketId = string.Empty;
    public int gameBucketIndex = 0;
    //The host's learning language
    public int LearningLanguage = 0;
    //The parent that created this
    public string parent = null;
    //Every class should inherit this. Shows what game type it is
    public virtual int Type {get;}=0;
    //See note below
    public List<GameBucketStorage> userBuckets = new List<GameBucketStorage>();
    public DateTime created = new DateTime(0);
    public DateTime lastUpdated = new DateTime(0);
    //When the game is updated (someone makes a move) we want to update the user. 
    public abstract UserGameBasic GetBasicUser();
}

//The user buckets are stored in lists. This ensures that we can access all of the
//user's lists if we want to make an update.
public class GameBucketStorage{
    public string Id {get;set;} = string.Empty;
    public int Index {get;set;} = 0;
    public GameBucketStorage(string id, int index){
        this.Id = id;
        this.Index = index;
    }
    public GameBucketStorage() {}
}