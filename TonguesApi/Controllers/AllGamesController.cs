using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/Games")]
public class AllGamesController : ControllerBase
{
    private readonly GamesService _gamesService;

    public AllGamesController(GamesService gamesService) {
        this._gamesService = gamesService;
    }

    
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<GameBucket>> Get(string id)
    {
        GameBucket? bucket = await _gamesService.GetBucketAsync(id);
        if (bucket is null) return NotFound();
        return bucket;
    }

    [HttpGet("{learningLanguage}/{nativeLanguage}")]
    public async Task<ActionResult<string>> GetByBucket(int learningLanguage, int nativeLanguage){
        GameBucket? headBucket = await _gamesService.GetBucketHead(learningLanguage, nativeLanguage);
        if(headBucket is null) return NotFound();
        return headBucket.Id;
    }
}