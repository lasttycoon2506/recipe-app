using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

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

    public async Task<UserLikes?> GetLikeAsync(int sourceUserId, int targetUserId)
    {
        return await context.Likes.FindAsync(sourceUserId, targetUserId);
    }

    public async Task<PagedList<MemberDto>> GetMatchesAsync(UserParams userParams)
    {
        var query = context.Likes.AsQueryable();

        var idsWhoUserLikes = await GetIdsWhoCurrentUserLikesAsync(userParams.CurrentUserId);

        return await PagedList<MemberDto>.GetResults(
            query
                .Where(x =>
                    x.TargetUserId == userParams.CurrentUserId
                    && idsWhoUserLikes.Contains(x.SourceUserId)
                )
                .Select(x => x.SourceUser)
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider),
            userParams.PgSize,
            userParams.PgNumber
        );
    }

    public async Task<IEnumerable<int>> GetIdsWhoCurrentUserLikesAsync(int currentUserId)
    {
        return await context
            .Likes.Where(x => x.SourceUserId == currentUserId)
            .Select(x => x.TargetUserId)
            .ToListAsync();
    }
}
