namespace API.Helpers;

public class UserParams : PaginationParams
{
    public string? Specialty { get; set; }
    public string? Experience { get; set; }
    public string? CurrentUsername { get; set; }
    public int CurrentUserId { get; set; }
}
