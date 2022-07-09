using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/NextLine")]
public class NextLineController : GamesControllerBase
{
    public NextLineController(GamesService gamesService, UsersService usersService)
        :base(gamesService, usersService){
        return;
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<NextLine>> Get(string id)
    {
        NextLine? game = (NextLine?) await _gamesService.GetGameAsync(id);
        if (game is null) return NotFound();
        return game;
    }



    //Things needed:
    //Target lanugage
    //Open Invitations
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] NextLineGameBasic newGame){
        
        int language = Int32.Parse(this.HttpContext.Request.Headers["Language"]);
        string userId = AuthFunctions.VerifyUser(this.HttpContext.Request.Headers["AuthToken"]);

        await AddGame(newGame, userId, language);

        return NoContent();
    }



    [HttpPut("join")]
    public async Task<ActionResult> Join([FromBody]GameBucketStorage gameId){

        string userId = AuthFunctions.VerifyUser(this.HttpContext.Request.Headers["AuthToken"]);

        GameBucket gameBucket = await _gamesService.GetBucketAsync(gameId.Id);
        NextLineGameBasic nextBasic = (NextLineGameBasic) gameBucket.gamesList[gameId.Index];
        NextLine game = new NextLine(nextBasic);
        game.sourceGameBucket = gameId;

        nextBasic.openInvitations--;
        if(nextBasic.openInvitations == -1){
            return new JsonResult("{'Error':'Game full'}");
        }
        else if(nextBasic.openInvitations == 0){
            await MakeGameUnpublic(nextBasic);
        }
        JoinChatGameWithUser(game, userId);
        return NoContent();
    }


    [HttpPut("{id:length(24)}/addMessage")]
    public async Task<ActionResult> addMessage(HttpRequestMessage request, [FromBody]NextLineIdMessagePair gameData){

        NextLine game = (NextLine) await _gamesService.GetGameAsync(gameData.Id);
        
        string id = AuthFunctions.VerifyUser(this.HttpContext.Request.Headers["AuthToken"]);

        if(game.HostId == id && !game.hostsTurn){
            return new JsonResult("{'Error':'Other player\'s turn'}");
        }
        if(game.HostId != id && game.hostsTurn){
            return new JsonResult("{'Error':'Other player\'s turn'}");
        }

        game.messages.Prepend(new NextLineMessage(gameData.Message, id));

        await UpdateUsers(game);
        await _gamesService.UpdateGameAsync(game.Id, game);

        return NoContent();
    }
}



public class NextLineIdMessagePair{
    public string Id;
    public string Message;
}