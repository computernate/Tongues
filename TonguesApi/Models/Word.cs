namespace TonguesApi.Models;

public class Word{
    public int id{ get; set; }
    public int language1 {get; set;} = 0;
    public int language2 {get; set;} = 0;
    public string definition1 {get; set;} = string.Empty;
    public string definition2 {get; set;} = string.Empty;
    public int timesUsed {get; set;} = 0;
    public DateTime lastUsed {get; set;} = new DateTime(0);
}