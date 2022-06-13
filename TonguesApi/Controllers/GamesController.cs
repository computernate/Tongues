using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[ApiController]
[Route("api/Games")]
public class GamesController : ControllerBase
{
    private readonly GamesService _gamesService;

    public GamesController(GamesService gamesService) =>
        _gamesService = gamesService;

    [HttpGet]
    public async Task<List<GameBase>> Get(int start, int limit, List<int> languages) {
        if(languages.Count == 1){
            return await _gamesService.GetAsync(start, limit, languages[0]);
        }
        else{
            return await _gamesService.GetAsync(start, limit, languages);
        }
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<GameBase>> Get(string id)
    {
        var game = await _gamesService.GetAsync(id);
        if (game is null) return NotFound();

        return game;
    }

    [HttpPost]
    public async Task<IActionResult> Post(GameBase newGame)
    {
        await _gamesService.CreateAsync(newGame);
        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }

    
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, GameBase updatedGame)
    {
        var game = await _gamesService.GetAsync(id);

        if (game is null) return NotFound();

        updatedGame.Id = game.Id;

        await _gamesService.UpdateAsync(id, updatedGame);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var game = await _gamesService.GetAsync(id);

        if (game is null) return NotFound();

        await _gamesService.RemoveAsync(id);

        return NoContent();
    }
}