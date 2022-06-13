namespace TonguesApi.Models;

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