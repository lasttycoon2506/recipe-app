using System.Runtime.CompilerServices;
using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetUserAsync(username);

            if (user == null)
                return NotFound();

            return user;
        }

        [HttpPut("{username}")]
        public async Task<AsyncVoidMethodBuilder> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
