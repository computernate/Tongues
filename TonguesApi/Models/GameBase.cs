using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class GameBase{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id {get; set;} = string.Empty;
    public int OwnerLanguage {get; set;} = 0;
    public int language2 {get; set;} = 1;
    public int GameType {get; set;} = 0;
    public string Blurb {get; set;} = string.Empty;
    public string OwnerId {get; set;} = string.Empty;
    public bool isPublic {get; set;} = true;
}