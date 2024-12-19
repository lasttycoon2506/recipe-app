using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LikesRepository(DataContext context, IMapper mapper) : ILikesRepository
{
    public void AddLike(UserLikes like)
    {
        context.Likes.Add(like);
    }

    public void DeleteLike(UserLikes like)
    {
        context.Likes.Remove(like);
    }

    public async Task<UserLikes?> GetLike(int sourceUserId, int targetUserId)
    {
        return await context.Likes.FindAsync(sourceUserId, targetUserId);
    }

    public async Task<IEnumerable<MemberDto>> GetMatches(int userId)
    {
        var query = context.Likes.AsQueryable();

        var idsWhoUserLikes = await GetIdsWhoCurrentUserLikes(userId);
        return await query
            .Where(x => x.TargetUserId == userId && idsWhoUserLikes.Contains(x.SourceUserId))
            .Select(x => x.SourceUser)
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<IEnumerable<int>> GetIdsWhoCurrentUserLikes(int currentUserId)
    {
        return await context
            .Likes.Where(x => x.SourceUserId == currentUserId)
            .Select(x => x.TargetUserId)
            .ToListAsync();
    }

    public async Task<bool> Save()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
