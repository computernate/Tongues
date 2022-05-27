using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class PublicGame{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id {get; set;} = string.Empty;
    public int GameType {get; set;} = 0;
    public string Blurb {get; set;} = string.Empty;
    public string OwnerId {get; set;} = string.Empty;
}