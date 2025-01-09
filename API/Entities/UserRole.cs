using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class UserRole : IdentityRole<int>
{
    public ICollection<UserRoles> UserRoles { get; set; } = [];
}
