using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[ApiController]
[Route("api/PublicGames")]
public class PublicGamesController : ControllerBase
{
    private readonly PublicGamesService _publicGamesService;

    public PublicGamesController(PublicGamesService gamesService) =>
        _publicGamesService = gamesService;

    [HttpGet]
    public async Task<List<PublicGame>> Get() =>
        await _publicGamesService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<PublicGame>> Get(string id)
    {
        var game = await _publicGamesService.GetAsync(id);

        if (game is null)
        {
            return NotFound();
        }

        return game;
    }

    [HttpPost]
    public async Task<IActionResult> Post(PublicGame newGame)
    {
        await _publicGamesService.CreateAsync(newGame);

        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, PublicGame updatedGame)
    {
        var game = await _publicGamesService.GetAsync(id);

        if (game is null)
        {
            return NotFound();
        }

        updatedGame.Id = game.Id;

        await _publicGamesService.UpdateAsync(id, updatedGame);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var game = await _publicGamesService.GetAsync(id);

        if (game is null)
        {
            return NotFound();
        }

        await _publicGamesService.RemoveAsync(id);

        return NoContent();
    }
}