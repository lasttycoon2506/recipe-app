using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
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
            var member = await userRepository.GetMemberAsync(username);

            if (member == null)
                return NotFound();

            return member;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetMembers(
            [FromQuery] UserParams userParams
        )
        {
            userParams.CurrentUsername = User.GetUsername();
            var members = await userRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(members);

            return Ok(members);
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

        [HttpPost("add-pic")]
        public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile file)
        {
            var user = await userRepository.GetUserAsync(User.GetUsername());
            if (user == null)
                return BadRequest("user dne in db");

            var result = await photoService.UploadImgAsync(file);

            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var pic = new Photo { Url = result.SecureUrl.AbsoluteUri, PublicId = result.PublicId };

            user.Photos.Add(pic);

            if (await userRepository.SaveAsync())
                return CreatedAtAction(
                    nameof(GetMember),
                    new { username = user.UserName },
                    mapper.Map<PhotoDto>(pic)
                );

            return BadRequest("unable to save pic to db");
        }

        [HttpPut("set-main-pic/{photoId:int}")]
        public async Task<ActionResult> SetMainPic(int photoId)
        {
            var user = await userRepository.GetUserAsync(User.GetUsername());
            if (user == null)
                return BadRequest("user dne in db");

            var newMainPic = user.Photos.FirstOrDefault(pic => pic.Id == photoId);

            if (newMainPic == null || newMainPic.IsMain)
                return BadRequest("pic already set as main or is null");

            var currentMainPic = user.Photos.FirstOrDefault(pic => pic.IsMain);
            if (currentMainPic != null)
                currentMainPic.IsMain = false;
            newMainPic.IsMain = true;

            if (await userRepository.SaveAsync())
                return NoContent();
            return BadRequest("unable to set new pic as main");
        }

        [HttpDelete("delete-pic/{photoId:int}")]
        public async Task<ActionResult> DeletePic(int photoId)
        {
            var user = await userRepository.GetUserAsync(User.GetUsername());
            if (user == null)
                return BadRequest("user not found in db");

            var picToDelete = user.Photos.FirstOrDefault(pic => pic.Id == photoId);
            if (picToDelete == null || picToDelete.IsMain)
                return BadRequest("pic dne in users photos or pic is set as main");

            if (picToDelete.PublicId != null)
            {
                var result = await photoService.DeleteImgAsync(picToDelete.PublicId);
                if (result.Error != null)
                    return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(picToDelete);
            if (await userRepository.SaveAsync())
                return Ok();
            return BadRequest("error deleting from db");
        }
    }
}
