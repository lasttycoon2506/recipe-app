using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class UserRole : IdentityUserRole<int>
{
    public User User { get; set; } = null!;
    public AppRole Role { get; set; } = null!;
}
