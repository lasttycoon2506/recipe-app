using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(IUnitOfWork unitOfWork) : BaseApiController
{
    [HttpGet("list-like-ids")]
    public async Task<IEnumerable<int>> GetIdsWhoUserLikes()
    {
        return await unitOfWork.LikesRepository.GetIdsWhoCurrentUserLikesAsync(User.GetUserId());
    }

    [HttpGet("list-matches")]
    public async Task<PagedList<MemberDto>> GetMatches([FromQuery] UserParams userParams)
    {
        userParams.CurrentUserId = User.GetUserId();
        var matchedMembers = await unitOfWork.LikesRepository.GetMatchesAsync(userParams);
        Response.AddPaginationHeader(matchedMembers);
        return matchedMembers;
    }

    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult> Like(int targetUserId)
    {
        if (User.GetUserId() == targetUserId)
            return BadRequest("cant like yourself!");

        var existingLike = await unitOfWork.LikesRepository.GetLikeAsync(
            User.GetUserId(),
            targetUserId
        );

        if (existingLike == null)
        {
            var newLike = new UserLikes
            {
                SourceUserId = User.GetUserId(),
                TargetUserId = targetUserId,
            };
            unitOfWork.LikesRepository.AddLike(newLike);
        }
        else
        {
            return BadRequest("user already liked");
        }

        if (await unitOfWork.Save())
            return StatusCode(201);
        return BadRequest("unable to save like in db");
    }
}
