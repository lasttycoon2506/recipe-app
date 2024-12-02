namespace API.Entities;

public class User
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public List<Photo> Photos { get; set; } = [];
    public DateOnly Created { get; set; }
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
}
