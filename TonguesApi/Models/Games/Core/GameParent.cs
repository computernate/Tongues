using MongoDB.Bson.Serialization.Attributes;
namespace TonguesApi.Models;

/*
This is the object that exists in the PUBLIC space. Each game parent should have functions
that create a game based on it. This way, when the user clicks to join, either a new game
can be created or they can join an existing room.
*/

[BsonDiscriminator(Required = true)]
[BsonKnownTypes(typeof(NextLineGameParent))]
public class GameParent{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id {get; set;} = string.Empty;
    public virtual int Type {get;set;} = 0;
    public List<GameBucketStorage> gameBuckets = new List<GameBucketStorage>();
    public string HostId {get; set;}  = string.Empty;
    public bool IsDeleted {get; set;}  = false;
    public bool IsPublic {get; set;}  = true;
    //THE LANGUAGE THE HOST IS LEARNING
    public int LearningLanguage {get; set;} = 0;
    //THE LANGUAGES THE HOST SPEAKS
    public List<int> NativeLanguages {get; set;} = new List<int>();
    public DateTime created = new DateTime(0);
    public DateTime lastUpdated = new DateTime(0);
}