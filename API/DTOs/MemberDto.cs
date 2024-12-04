namespace API.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? PhotoUrl { get; set; }
    public List<PhotoDto>? Photos { get; set; } = [];
    public DateOnly Created { get; set; }
    public DateTime LastActive { get; set; }
    public string? Experience { get; set; }
}
