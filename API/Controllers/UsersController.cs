using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetMember(string username)
        {
            var user = await userRepository.GetMemberAsync(username);

            if (user == null)
                return NotFound();

            return user;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
        {
            var users = await userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (username == null)
                return BadRequest("username not found in token");

            var user = await userRepository.GetUserAsync(username);
            if (user == null)
                return BadRequest("user dne in db");

            mapper.Map(memberUpdateDto, user);
            if (await userRepository.SaveAsync())
                return NoContent();

            return BadRequest("failed to update user");
        }
    }
}
