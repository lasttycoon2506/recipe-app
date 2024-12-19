using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikesRepository likesRepository) : BaseApiController
{
    [HttpGet("list-ids")]
    public async Task<IEnumerable<int>> GetIdsWhoUserLikes()
    {
        return await likesRepository.GetIdsWhoCurrentUserLikes(User.GetUserId());
    }

    [HttpGet("list")]
    public async Task<IEnumerable<MemberDto>> GetMatches()
    {
        return await likesRepository.GetMatches(User.GetUserId());
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

        if (await likesRepository.Save())
            return Ok();

        return BadRequest("unable to like");
    }
}
