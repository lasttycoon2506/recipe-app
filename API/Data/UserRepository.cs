using API.Entities;
using API.Interfaces;

namespace API.Data;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<User> GetUserAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public Task<IEnumerable<User>> GetUsersAsync()
    {
        throw new NotImplementedException();
    }

    public Task<bool> SaveAsync()
    {
        throw new NotImplementedException();
    }
}
