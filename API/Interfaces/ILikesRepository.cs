using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLikes> GetLike(int sourceId, int targetId);
    Task<IEnumerable<MemberDto>> GetLikes(string predicate, int userId);
    Task<IEnumerable<int>> GetLikesIds(int currentUserId);
    void DeleteLike(UserLikes like);
    void AddLike(UserLikes like);
    Task<bool> Save();
}
