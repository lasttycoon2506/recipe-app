using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AdminController(UserManager<User> userManager) : BaseApiController
{
    [Authorize(Policy = "AdminRoleRequired")]
    [HttpGet("users-with-roles")]
    public async Task<ActionResult> GetUsersWithRoles()
    {
        var usersWithRoles = await userManager
            .Users.Select(user => new
            {
                id = user.Id,
                username = user.UserName,
                roles = user.UserRoles.Select(role => role.Role.Name).ToList(),
            })
            .OrderBy(user => user.username)
            .ToListAsync();

        return Ok(usersWithRoles);
    }

    [Authorize(Policy = "AdminRoleRequired")]
    [HttpPost("edit-role/{username}")]
    public async Task<ActionResult> EditUserRole(string username, string roles)
    {
        if (string.IsNullOrEmpty(roles))
            return BadRequest("new roles dne");

        var newRoles = roles.Split(",").ToArray();

        var user = await userManager.FindByNameAsync(username);
        if (user == null)
            return NotFound("user dne");

        var existingRoles = await userManager.GetRolesAsync(user);

        var result = await userManager.RemoveFromRolesAsync(user, existingRoles);
        if (!result.Succeeded)
            return BadRequest("unable to remove existing roles from user");

        result = await userManager.AddToRolesAsync(user, newRoles);
        if (!result.Succeeded)
            return BadRequest("unable to add new roles to user");

        return Ok(newRoles);
    }
}
