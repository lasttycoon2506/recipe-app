using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UsernameExists(registerDto.Username))
            return BadRequest("username exists");
        using var hmac = new HMACSHA512();

        var newUser = new User
        {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
        };

        context.Users.Add(newUser);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = newUser.UserName,
            token = tokenService.CreateToken(newUser),
        };
    }

    [HttpGet("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(user =>
            user.UserName == loginDto.Username.ToLower()
        );

        if (user == null)
            return Unauthorized("invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var loginAttemptHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < loginAttemptHash.Length; i++)
        {
            if (user.PasswordHash[i] != loginAttemptHash[i])
                return Unauthorized("invalid pw");
        }
        return new UserDto { Username = user.UserName, token = tokenService.CreateToken(user) };
    }

    public async Task<bool> UsernameExists(string username)
    {
        return await context.Users.AnyAsync(user => user.UserName == username.ToLower());
    }
}
