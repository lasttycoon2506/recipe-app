using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [StringLength(16, MinimumLength = 5)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [StringLength(16, MinimumLength = 8)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string? Experience { get; set; }

    [Required]
    public string? Specialty { get; set; }
}
