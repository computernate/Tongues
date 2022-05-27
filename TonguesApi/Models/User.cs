using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class User{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public List<string> NativeLangueages {get; set;} = new List<string>();
    public List<string> LearningLangueages {get; set;} = new List<string>();
    public List<Word> Words {get; set;} = new List<Word>();
    public int AllowedWords = 20;
}