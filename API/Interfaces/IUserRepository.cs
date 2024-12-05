using API.DTOs;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<MemberDto>> GetUsersAsync();
    Task<MemberDto?> GetUserAsync(string username);
    Task<bool> SaveAsync();
}
