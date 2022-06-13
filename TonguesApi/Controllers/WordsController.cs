using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/Users/{id:length(24)}/Words")]
public class WordsController : ControllerBase
{
    private readonly UsersService _usersService;
    
    public WordsController(UsersService usersService) =>
        _usersService = usersService;

    //We want anything odd to come first (So they are using words twice in a row)
    //Then anything brand new, then anything older. This sorts the words for us.
    private int wordSortOrder(Word w1, Word w2){
        int score1 = 0;
        int score2 = 0;
        if(w1.timesUsed % 2 == 1){
            score1 -= 10;
        }
        if(w2.timesUsed % 2 == 1){
            score2 -= 10;
        }
        
        if(w1.lastUsed == DateTime.MinValue){
            score1-=3;
        }
        else{
            score1 += (int) Math.Floor(w1.timesUsed / (DateTime.Now - w1.lastUsed).TotalDays);
        }
        if(w2.lastUsed == DateTime.MinValue){
            score2-=3;
        }
        else{
            score2 += (int) Math.Floor(w2.timesUsed / (DateTime.Now - w2.lastUsed).TotalDays);
        }
        return score2 - score1;
    }

    //Get the words based on the target language
    [HttpGet("{language:int}")]
    public async Task<ActionResult<List<Word>>> GetWords(string id, int language, int limit=0)
    {
        List<Word> words = await _usersService.GetWordsAsync(id);
        if (words is null)return NotFound();

        if(limit == 0)
            return words;
        else
            words = words.FindAll(x => x.language2 == language);
            return words.Take(limit).ToList<Word>();
    }

    //Get a word from the user based on its id
    [HttpGet("{wordId:int}")]
    public async Task<ActionResult<Word>> GetWord(string id, int wordId)
    {
        var words = await _usersService.GetWordsAsync(id);
        if (words is null)return NotFound();

        return words.Where(i => i.id == wordId).FirstOrDefault();
    }

    //Add a new word
    [HttpPost]
    public async Task<IActionResult> AddWord(string id, [FromBody]Word newWord)
    {
        List<Word> words = await _usersService.GetWordsAsync(id);
        if (words is null)return NotFound();

        Random rnd = new Random();
        newWord.id=rnd.Next(1048575);
        words.Add(newWord);

        words.Sort(wordSortOrder);

        await _usersService.UpdateWordsAsync(id, words);
        return NoContent();
    }

    //Use a word. Add one to its times used, update the timestamp, and resort the words
    [HttpPut("{wordId:int}")]
    public async Task<IActionResult> UseWord(string id, int wordId)
    {
        List<Word> words = await _usersService.GetWordsAsync(id);

        Word word = words.Where(i => i.id == wordId).FirstOrDefault();

        if (words is null || word is null) return NotFound();
        word.timesUsed++;
        word.lastUsed = DateTime.Now;
        words.Sort(wordSortOrder);

        await _usersService.UpdateWordsAsync(id, words);
        return NoContent();
    }

    //Edits a specific word
    [HttpPut("{wordId:int}")]
    public async Task<IActionResult> EditWord(string id, int wordId, [FromBody]Word newWord)
    {
        List<Word> words = await _usersService.GetWordsAsync(id);

        Word word = words.Where(i => i.id == wordId).FirstOrDefault();

        if (words is null || word is null) return NotFound();
        
        word.definition1=newWord.definition1;
        word.definition2=newWord.definition2;

        await _usersService.UpdateWordsAsync(id, words);
        return NoContent();
    }

    //Delete a word by its id
    [HttpDelete("{wordId:int}")]
    public async Task<IActionResult> DeleteWord(string id, int wordId){
        List<Word> words = await _usersService.GetWordsAsync(id);

        words.RemoveAll(x => x.id == wordId);
        await _usersService.UpdateWordsAsync(id, words);
        return NoContent();
    }
}
