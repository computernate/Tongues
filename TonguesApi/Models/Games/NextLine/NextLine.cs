using MongoDB.Bson.Serialization.Attributes;

namespace TonguesApi.Models;

public class NextLine: Game{
    public int type{get; set;} = 1;
    public List<NextLineMessage> messages{get; set;} = new List<NextLineMessage>();
    public bool hostsTurn{get; set;} = false;
    public override NextLineUserBasic GetBasicUser(){
        NextLineUserBasic basicUser = new NextLineUserBasic(this.messages[0].message.message);
        basicUser.sourceGameBucket = this.sourceGameBucket;
        return basicUser;
    }
    public NextLine(NextLineGameBasic basicGame){
        this.HostId=basicGame.HostId;
        this.messages.Add(new NextLineMessage(basicGame.firstMessage, basicGame.HostId));
    }
}


public class NextLineGameBasic : GameBasic{
    public string firstMessage {get;set;} = string.Empty;
    public int openInvitations {get;set;} = 1;
    public NextLineGameBasic(string firstMessage){
        this.firstMessage = firstMessage;
        this.openInvitations = openInvitations;
    }
}

public class NextLineUserBasic : UserGameBasic{
    public string firstMessage = string.Empty;
    public NextLineUserBasic(string firstMessage){
        this.firstMessage = firstMessage;
    }
}

public class NextLineMessage{
    public string saidBy = string.Empty;
    public DateTime timestamp = new DateTime();
    public CorrectableMessage message = null;
    public NextLineMessage(string message, string byPlayer){
        this.message = new CorrectableMessage(message);
        this.saidBy = byPlayer;
        this.timestamp = DateTime.Now;
    }
}