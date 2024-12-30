using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository(DataContext context, IMapper mapper, ILikesRepository likesRepository)
    : IUserRepository
{
    public async Task<MemberDto?> GetMemberAsync(string username)
    {
        return await context
            .Users.Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
    {
        var query = context.Users.AsQueryable();
        query = query.Where(member => member.UserName != userParams.CurrentUsername);

        if (userParams.Specialty != null)
        {
            query = query.Where(member => member.Specialty == userParams.Specialty);
        }

        if (userParams.Experience != null)
        {
            query = query.Where(member => member.Experience == userParams.Experience);
        }

        query = query.OrderByDescending(member => member.LastActive);

        //returns only users curr.user hasnt liked
        var whoUserLikesIds = await likesRepository.GetIdsWhoCurrentUserLikesAsync(
            userParams.CurrentUserId
        );
        query = query.Where(member => !whoUserLikesIds.Contains(member.Id));

        return await PagedList<MemberDto>.GetResults(
            query.ProjectTo<MemberDto>(mapper.ConfigurationProvider),
            userParams.PgSize,
            userParams.PgNumber
        );
    }

    public async Task<User?> GetUserAsync(string username)
    {
        return await context
            .Users.Include(x => x.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
