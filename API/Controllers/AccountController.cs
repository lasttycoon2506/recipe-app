using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(
    UserManager<User> userManager,
    ITokenService tokenService,
    IMapper mapper
) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UsernameExists(registerDto.Username))
            return BadRequest("username already exists");

        var newUser = mapper.Map<User>(registerDto);
        newUser.UserName = registerDto.Username.ToLower();

        var result = await userManager.CreateAsync(newUser, registerDto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return new UserDto
        {
            Username = newUser.UserName,
            Token = tokenService.CreateToken(newUser),
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await userManager
            .Users.Include(user => user.Photos)
            .FirstOrDefaultAsync(user => user.UserName == loginDto.Username.ToLower());

        if (user == null || user.UserName == null)
            return Unauthorized("invalid username");

        var pwCheckResult = await userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!pwCheckResult)
            return Unauthorized("incorrect pw");

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(pic => pic.IsMain)?.Url,
        };
    }

    public async Task<bool> UsernameExists(string username)
    {
        return await userManager.Users.AnyAsync(user => user.UserName == username.ToLower());
    }
}
