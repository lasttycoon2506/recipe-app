using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class User : IdentityUser<int>
{
    public List<Photo> Photos { get; set; } = [];
    public DateOnly Created { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string? Experience { get; set; }
    public string? Specialty { get; set; }
    public string? Recipe { get; set; }
    public List<UserLikes> WhoLikesUser { get; set; } = [];
    public List<UserLikes> WhoUserLikes { get; set; } = [];
    public List<Message> MessagesSent { get; set; } = [];
    public List<Message> MessagesReceived { get; set; } = [];
    public ICollection<UserRole> UserRoles { get; set; } = [];
}
