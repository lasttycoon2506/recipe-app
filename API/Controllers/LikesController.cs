using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikesRepository likesRepository) : BaseApiController
{
    [HttpGet("list-like-ids")]
    public async Task<IEnumerable<int>> GetIdsWhoUserLikes()
    {
        return await likesRepository.GetIdsWhoCurrentUserLikes(User.GetUserId());
    }

    [HttpGet("list-matches")]
    public async Task<PagedList<MemberDto>> GetMatches([FromQuery] UserParams userParams)
    {
        userParams.CurrentUserId = User.GetUserId();
        var matchedMembers = await likesRepository.GetMatches(userParams);
        Response.AddPaginationHeader(matchedMembers);
        return matchedMembers;
    }

    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult> Like(int targetUserId)
    {
        if (User.GetUserId() == targetUserId)
            return BadRequest("cant like yourself!");

        var existingLike = await likesRepository.GetLike(User.GetUserId(), targetUserId);

        if (existingLike == null)
        {
            var newLike = new UserLikes
            {
                SourceUserId = User.GetUserId(),
                TargetUserId = targetUserId,
            };
            likesRepository.AddLike(newLike);
        }
        else
        {
            return BadRequest("user already liked");
        }

        if (await likesRepository.Save())
            return StatusCode(201);
        return BadRequest("unable to save like in db");
    }
}
