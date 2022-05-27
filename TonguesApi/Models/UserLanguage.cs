using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class UserLanguage{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string name {get; set;} = string.Empty;
    public int level = 0;
}