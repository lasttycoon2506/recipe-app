using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    // public async Task<User?> GetUserAsync(int id)
    // {
    //     return await context.Users.FindAsync(id);
    // }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await context.Users.Include(x => x.Photos).ToListAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    async Task<UserDto?> GetUserAsync(int id)
    {
        return await context
            .Users.Where(x => x.Id == id)
            .ProjectTo<UserDto>(mapper.ConfigurationProvider);
    }

    Task<IEnumerable<UserDto>> IUserRepository.GetUsersAsync()
    {
        throw new NotImplementedException();
    }
}
