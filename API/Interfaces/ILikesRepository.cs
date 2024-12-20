using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLikes?> GetLike(int sourceUserId, int targetUserId);
    Task<PagedList<MemberDto>> GetMatches(UserParams userParams);
    Task<IEnumerable<int>> GetIdsWhoCurrentUserLikes(int currentUserId);
    void DeleteLike(UserLikes like);
    void AddLike(UserLikes like);
    Task<bool> Save();
}
