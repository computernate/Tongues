namespace TonguesApi.Models;

public class CorrectableMessage{
    public string message = string.Empty;
    public string correction = string.Empty;
    public string correctedById = string.Empty;
    public int rating = 0;
    public string comment = string.Empty;
    public CorrectableMessage(string message){
        this.message = message;
    }

    public void Correct(string id, string correction, string comment){
        this.correctedById = id;
        this.correction = correction;
        this.comment = comment;
    }
    public void Rate(User forUser, int rating){
        if(this.rating < 8 && rating >= 8){
            //Give the user a coin
        }
        else if (this.rating >= 8 && rating < 8){
            //Take a coin away
        }
        this.rating = rating;
    }
}