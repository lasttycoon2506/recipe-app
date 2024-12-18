namespace API.Entities;

public class UserLikes
{
    public User SourceUser { get; set; } = null!;
    public int SourceUserId { get; set; }
    public User TargetUser { get; set; } = null!;
    public int TargetUserId { get; set; }
}
