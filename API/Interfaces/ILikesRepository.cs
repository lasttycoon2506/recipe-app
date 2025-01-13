using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLikes?> GetLikeAsync(int sourceUserId, int targetUserId);
    Task<PagedList<MemberDto>> GetMatchesAsync(UserParams userParams);
    Task<IEnumerable<int>> GetIdsWhoCurrentUserLikesAsync(int currentUserId);
    void DeleteLike(UserLikes like);
    void AddLike(UserLikes like);
}
