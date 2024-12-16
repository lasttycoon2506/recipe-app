using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
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

        query = userParams.OrderBy() switch
        {
            "created" => query.OrderByDescending(member => member.Created),
            _ => query.OrderByDescending(member => member.LastActive),
        };

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

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await context.Users.Include(x => x.Photos).ToListAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
