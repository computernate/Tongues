using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class UserLanguage{
    public int language {get; set;} = 0;
    public int level = 0;
    public UserLanguage(int language, int level){
        this.language=language;
        this.level=level;
    }
}