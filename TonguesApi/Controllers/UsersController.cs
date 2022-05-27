using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/Users")]
public class UsersController : ControllerBase
{
    private readonly UsersService _usersService;

    public UsersController(UsersService booksService) =>
        _usersService = booksService;

    [HttpGet]
    public async Task<List<User>> Get() =>
        await _usersService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpGet("{id:length(24)}/Words")]
    public async Task<ActionResult<List<Word>>> GetWords(string id)
    {
        var words = await _usersService.GetWordsAsync(id);

        if (words is null)
        {
            return NotFound();
        }

        return words;
    }

    [HttpGet("{id:length(24)}/Words/{Limit}")]
    public async Task<ActionResult<List<Word>>> GetLimitedWords(string id, int Limit)
    {
        List<Word> words = await _usersService.GetWordsAsync(id);

        if (words is null)
        {
            return NotFound();
        }

        return (List<Word>) words.Take(Limit);
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        Console.Write("Posted");

        await _usersService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        updatedUser.Id = user.Id;

        await _usersService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        await _usersService.RemoveAsync(id);

        return NoContent();
    }
}