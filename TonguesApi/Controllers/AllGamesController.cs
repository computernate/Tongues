using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;


namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/Games")]
public class AllGamesController : ControllerBase
{
    private readonly GamesService _gamesService;

    public AllGamesController(GamesService gamesService) {
        this._gamesService = gamesService;
    }

    
    [HttpGet]
    public async Task<ActionResult<List<GameParent>>> GetGames(int LearningLanguage, string NativeLanguages, int start=0){
        //NOTE:
        //LEARNING LANGUAGE in the parameters refers to the language that the USER is trying to learn
        //LEARNING LANGUAGE in the database refers to the language that the HOST is trying to learn
        List<int> nativeLanguagesSplit = NativeLanguages
            .Split(',')
            .Where(x => int.TryParse(x, out _))
            .Select(int.Parse)
            .ToList();
        List<GameParent> parentList = await _gamesService.GetParentsAsync(start, nativeLanguagesSplit, LearningLanguage);
        //The games list now has all the data for the game parents. However, if we were to serialize it, it would be a list
        //of gameParents, not of the children. IE. NextLine wouldn't have firstMessage since it isnt' a nextlineparent, it is a
        //game parent. We need to serialize this ourselves.
        string json = "[";
        foreach(GameParent parent in parentList){
            Console.WriteLine(parent.Type);
            switch(parent.Type){
                case 1:
                    json += JsonSerializer.Serialize<NextLineGameParent>((NextLineGameParent) parent);
                    break;
                default:
                    json += JsonSerializer.Serialize<GameParent>(parent);
                    break;
            }
            json += ",";
        }
        json = json.TrimEnd(',');
        json += "]";
        return Content(json, "application/json");
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<GameParent>> Get(string id)
    {
        GameParent? parent = await _gamesService.GetParentAsync(id);
        if (parent is null) return NotFound();
        return parent;
    }

}