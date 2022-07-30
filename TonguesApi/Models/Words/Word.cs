namespace TonguesApi.Models;

public class Word : IComparable{
    public string Term {get; set;} = string.Empty;
    public string Definition {get; set;} = string.Empty;
    public int TimesUsed {get; set;} = 0;
    public DateTime LastUsed {get; set;} = new DateTime(0);
    public int score = 0;
    public List<string> tags {get;set;}= new List<string>();

    public bool Equals(Word otherWord) =>
        (LastUsed == otherWord.LastUsed && Definition == otherWord.Definition);

    public void calculateScore(int modifier){
        if (this.LastUsed == new DateTime(0)){
            this.score = 0;
            return;
        }
        int isOdd = (this.TimesUsed%2==1)? 4 * modifier: 0;
        int dateDifference = (int) (DateTime.Now - LastUsed).TotalDays;
        this.score = dateDifference + isOdd - (this.TimesUsed * modifier);
    }

    public int CompareTo(Object? otherObj){
        Word otherWord = (Word) otherObj;
        return otherWord.score - this.score;
    }
    public Word(int modifier){
        this.calculateScore(modifier);
    }
    public Word(){
        return;
    }
}