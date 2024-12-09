using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(
        IUserRepository userRepository,
        IMapper mapper,
        IPhotoService photoService
    ) : BaseApiController
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
            var user = await userRepository.GetUserAsync(User.GetUsername());
            if (user == null)
                return BadRequest("user dne in db");

            mapper.Map(memberUpdateDto, user);
            if (await userRepository.SaveAsync())
                return NoContent();

            return BadRequest("failed to update user");
        }

        public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile file)
        {
            var user = await userRepository.GetUserAsync(User.GetUsername());
            if (user == null)
                return BadRequest("user dne in db");

            var result = await photoService.UploadImgAsync(file);

            var pic = new Photo { Url = result.SecureUrl.AbsoluteUri, PublicId = result.PublicId };

            user.Photos.Add(pic);

            if (await userRepository.SaveAsync())
                return mapper.Map<PhotoDto>(pic);

            return BadRequest("unable to save pic to db");
        }
    }
}
