namespace TonguesApi.Models;

public class NextLine: Game{
    public override int Type {get;}= 1;
    public List<NextLineMessage> messages{get; set;} = new List<NextLineMessage>();
    public bool hostsTurn{get; set;} = false;
    public override NextLineUserBasic GetBasicUser(){
        NextLineUserBasic basicUser = new NextLineUserBasic(this.messages[0].message.message);
        basicUser.parent = this.parent;
        return basicUser;
    }
    public NextLine(NextLineGameParent parentGame){
        this.HostId=parentGame.HostId;
        this.messages.Add(new NextLineMessage(parentGame.firstMessage, parentGame.HostId));
    }
}


public class NextLineGameParent : GameParent{
    public override int Type {get;set;}= 1;
    public string firstMessage {get;set;} = string.Empty;
    public int openInvitations {get;set;} = 1;
    public NextLineGameParent(string firstMessage){
        this.firstMessage = firstMessage;
        this.openInvitations = openInvitations;
    }
    public NextLineGameParent(){
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
    public CorrectableMessage message = new CorrectableMessage("");
    public NextLineMessage(string message, string byPlayer){
        this.message = new CorrectableMessage(message);
        this.saidBy = byPlayer;
        this.timestamp = DateTime.Now;
    }
}