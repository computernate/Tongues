using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class NextLine: GameBase{
    public int gameType{get; set;} = 1;
    public List<NextLineMessage> messages{get; set;} = new List<NextLineMessage>();
    public bool turn{get; set;} = false;
    public NextLine(string userId, string firstMessage, int firstLanguage, int secondLanguage){
        this.players.Add(userId);
        this.OwnerLanguage=firstLanguage;
        this.language2=secondLanguage;
        this.Blurb=firstMessage;
        this.messages.Add(new NextLineMessage(firstMessage, userId));
    }
}