using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using server.Models;
using server.Data;
using server.DTOs;

namespace server.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public AuthenticationController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (existingUser != null)
        {
            return BadRequest(new ServerResponse<object>
            {
                Success = false,
                Message = "User already exists",
                Errors = ["Email has to be unique"]
            });
        }

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            Role = "User"
        };

        var hasher = new PasswordHasher<User>();

        user.PasswordHash = hasher.HashPassword(
            user,
            request.Password
        );

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var userDto = new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        };

        return Ok(new ServerResponse<UserDto>
        {
            Success = true,
            Message = "User created",
            Data = userDto
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login()
    {
        return Ok();
    }
}
