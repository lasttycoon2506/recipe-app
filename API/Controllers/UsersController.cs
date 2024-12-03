using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await userRepository.GetUsersAsync();
            var mappedUsers = mapper.Map<IEnumerable<UserDto>>(users);

            return Ok(mappedUsers);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await userRepository.GetUserAsync(id);

            if (user == null)
                return NotFound();
            else
                return mapper.Map<UserDto>(user);
        }
    }
}
