using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
    : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UsernameExists(registerDto.Username))
            return BadRequest("username already exists");
        using var hmac = new HMACSHA512();

        var newUser = mapper.Map<User>(registerDto);
        newUser.UserName = registerDto.Username.ToLower();

        context.Users.Add(newUser);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = newUser.UserName,
            Token = tokenService.CreateToken(newUser),
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context
            .Users.Include(user => user.Photos)
            .FirstOrDefaultAsync(user => user.UserName == loginDto.Username.ToLower());

        if (user == null)
            return Unauthorized("invalid username");

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(pic => pic.IsMain)?.Url,
        };
    }

    public async Task<bool> UsernameExists(string username)
    {
        return await context.Users.AnyAsync(user => user.UserName == username.ToLower());
    }
}
