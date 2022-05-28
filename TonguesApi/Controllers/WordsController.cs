using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/Users/Words")]
public class WordsController : ControllerBase
{
    private readonly UsersService _usersService;

    private List<Word> sortWords(List<Word> listOfWords){
        return listOfWords;
    }

    public WordsController(UsersService usersService) =>
        _usersService = usersService;

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<List<Word>>> GetWords(string id, int limit=0)
    {
        var words = await _usersService.GetWordsAsync(id);

        if (words is null)
        {
            return NotFound();
        }

        if(limit == 0)
            return words;
        else
            return (List<Word>) words.Take(limit);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> AddWord(string id, [FromBody]Word newWord)
    {
        List<Word> words = await _usersService.GetWordsAsync(id);

        if (words is null)
        {
            return NotFound();
        }
        words.Add(newWord);

        words = sortWords(words);

        await _usersService.UpdateWordsAsync(id, words);
        return NoContent();
    }
}
