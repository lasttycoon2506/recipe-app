using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLikes?> GetLike(int sourceUserId, int targetUserId);
    Task<IEnumerable<MemberDto>> GetMatches(int userId);
    Task<IEnumerable<int>> GetIdsWhoCurrentUserLikes(int currentUserId);
    void DeleteLike(UserLikes like);
    void AddLike(UserLikes like);
    Task<bool> Save();
}
