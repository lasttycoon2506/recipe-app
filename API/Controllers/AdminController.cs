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
    public async Task<ActionResult> AllUsersWithRoles()
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
}
