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
        Console.WriteLine(id);
        var user = await _usersService.GetAsync(id);
        if (user is null) return NotFound();
        return user;
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _usersService.CreateAsync(newUser);
        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var user = await _usersService.GetAsync(id);
        if (user is null) return NotFound();
        updatedUser.Id = user.Id;

        await _usersService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpPut("{id:length(24)}/addLearningLanguage")]
    public async Task<IActionResult> addLLanguage(string id, [FromBody]int language, [FromBody]int level){
        var user = await _usersService.GetAsync(id);
        if (user is null) return NotFound();
        user.LearningLangueages.Add(new UserLanguage(language, level));
        await _usersService.UpdateAsync(id, user);
        return NoContent();
    }

    [HttpPut("{id:length(24)}/addNativeLanguage")]
    public async Task<IActionResult> addNLanguage(string id, [FromBody]int language, [FromBody]int level){
        var user = await _usersService.GetAsync(id);
        if (user is null) return NotFound();
        user.NativeLangueages.Add(new UserLanguage(language, level));
        await _usersService.UpdateAsync(id, user);
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