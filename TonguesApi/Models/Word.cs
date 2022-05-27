using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class Word{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string language1 {get; set;} = string.Empty;
    public string language2 {get; set;} = string.Empty;
    public string definition1 {get; set;} = string.Empty;
    public string definition2 {get; set;} = string.Empty;
    public int timesUsed {get; set;} = 0;
    public DateTime lastUsed {get; set;} = new DateTime(0);
}