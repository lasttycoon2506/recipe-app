using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Data;

public class LikesRepository : ILikesRepository
{
    public void AddLike(UserLikes like)
    {
        throw new NotImplementedException();
    }

    public void DeleteLike(UserLikes like)
    {
        throw new NotImplementedException();
    }

    public Task<UserLikes> GetLike(int sourceId, int targetId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MemberDto>> GetLikes(string predicate, int userId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<int>> GetLikesIds(int currentUserId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Save()
    {
        throw new NotImplementedException();
    }
}
