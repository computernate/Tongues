using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

//This object exists on the user. It gets the basic info about a bucket, and allows them to keep their on-hand 10 words
public class BasicWordBucket{
    public string Id {get; set;} = string.Empty;
    public int Language1 {get; set;} = 0;
    public int Language2 {get; set;} = 0;
    
    //Don't let this list exceed 10
    public List<Word> Words {get; set;} = new List<Word>();
    public BasicWordBucket(WordBucket parent){
        this.Id = parent.Id;
        this.Language1 = parent.Language1;
        this.Language2 = parent.Language2;
        this.Words = parent.Words.Take(10).ToList();
    }
}