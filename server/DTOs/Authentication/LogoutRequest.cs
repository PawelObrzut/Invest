using System.ComponentModel.DataAnnotations;

namespace server.DTOs;

public class LogoutRequest
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}