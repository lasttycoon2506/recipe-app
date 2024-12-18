using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(LikesRepository likesRepository) : BaseApiController
{
    [HttpGet("list-likeIds")]
    public async Task<IEnumerable<int>> GetIdsWhoUserLikes()
    {
        return await likesRepository.GetIdsWhoCurrentUserLikes(User.GetUserId());
    }

    [HttpGet("list-likes")]
    public async Task<IEnumerable<MemberDto>> GetLikes(string predicate)
    {
        return await likesRepository.GetLikes(predicate, User.GetUserId());
    }

    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult> ToggleLike(int targetUserId)
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
            likesRepository.DeleteLike(existingLike);
        }

        if (await likesRepository.Save())
            return Ok();

        return BadRequest("unable to update like");
    }
}
