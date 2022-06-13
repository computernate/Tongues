using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/NextLine")]
public class NextLineController : ControllerBase
{
    private readonly NextLineService _gamesService;

    public NextLineController(NextLineService gamesService) =>
        _gamesService = gamesService;

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<NextLine>> Get(string id)
    {
        var game = await _gamesService.GetAsync(id);
        if (game is null) return NotFound();
        return game;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] string userId, [FromBody] int lang1, [FromBody] int lang2, 
        [FromBody] string message)
    {
        NextLine game = new NextLine(userId, message, lang1, lang2);
        await _gamesService.CreateAsync(game);
        return CreatedAtAction(nameof(Get), new { id = game.Id }, game);
    }

    //Give a new message
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, [FromBody]string message, [FromBody]User user)
    {
        var game = await _gamesService.GetAsync(id);
        if (game is null) return NotFound();
        if(game.players.Count == 1){
            game.isPublic = false;
            game.players.Add(user.Id);
        }
        game.messages.Add(new NextLineMessage(message, user.Id));
        //Send a message
        await _gamesService.UpdateAsync(id, game);
        return NoContent();
    }


    //Give a new message correction
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> GiveFeedback(string id, [FromBody]DateTime timestamp, [FromBody]string correction, [FromBody]string note, [FromBody]User user)
    {
        var game = await _gamesService.GetAsync(id);
        if (game is null) return NotFound();
        NextLineMessage message = game.messages.Where(u => u.timestamp == timestamp).First();
        if (game is null) return NotFound();
        message.message.Correct(user.Id, correction, note);
        await _gamesService.UpdateAsync(id, game);
        return NoContent();
    }


    //Rate a message correction
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> RateFeedback(string id, [FromBody]DateTime timestamp, [FromBody]int rating,  [FromBody]User ratingUser)
    {
        var game = await _gamesService.GetAsync(id);
        if (game is null) return NotFound();
        CorrectableMessage message = game.messages.Where(u => u.timestamp == timestamp).First().message;
        if (game is null) return NotFound();
        message.Rate(ratingUser, rating);
        await _gamesService.UpdateAsync(id, game);
        return NoContent();
    }


    //If someone joins the game, 
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id, [FromBody]string userId)
    {
        var game = await _gamesService.GetAsync(id);
        if (game is null) return NotFound();
        game.players.Remove(userId);
        if(game.players.Count==0) await _gamesService.RemoveAsync(id);
        else{
            game.isPublic = true;
            await _gamesService.UpdateAsync(id, game);
            //Notify other players
        }
        return NoContent();
    }
}