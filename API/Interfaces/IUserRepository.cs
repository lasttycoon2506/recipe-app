using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User?> GetUserAsync(string username);
    Task<MemberDto> GetMemberAsync(string username);
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<bool> SaveAsync();
}
