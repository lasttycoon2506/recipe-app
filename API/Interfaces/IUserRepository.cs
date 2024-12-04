using API.DTOs;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<MemberDto>> GetUsersAsync();
    Task<MemberDto?> GetUserAsync(int id);
    Task<bool> SaveAsync();
}
