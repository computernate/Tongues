using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api")]
public class AllGamesController : ControllerBase
{
    private readonly GamesService _gamesService;

    public AllGamesController(GamesService gamesService) {
        this._gamesService = gamesService;
    }

    
    [HttpGet("Games/{id:length(24)}")]
    public async Task<ActionResult<GameBucket>> Get(string id)
    {
        GameBucket? bucket = await _gamesService.GetBucketAsync(id);
        if (bucket is null) return NotFound();
        return bucket;
    }
}