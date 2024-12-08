using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<MemberDto?> GetMemberAsync(string username)
    {
        return await context
            .Users.Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await context.Users.ProjectTo<MemberDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public Task<IEnumerable<MemberDto>> GetUsersAsync()
    {
        throw new NotImplementedException();
    }

    public Task<MemberDto?> GetUserAsync(string username)
    {
        throw new NotImplementedException();
    }
}
