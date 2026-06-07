using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

using server.Data;
using server.DTOs;
using server.Models;

namespace server.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<ServerResponse<UserDto>> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (existingUser != null)
        {
            return new ServerResponse<UserDto>
            {
                Success = false,
                Message = "User already exists",
                Errors = ["Email has to be unique"]
            };
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

        return new ServerResponse<UserDto>
        {
            Success = true,
            Message = "User created",
            Data = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            }
        };
    }

    public async Task<ServerResponse<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
        {
            return new ServerResponse<AuthResponse>
            {
                Success = false,
                Message = "User not found"
            };
        }

        var hasher = new PasswordHasher<User>();

        var result = hasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password
        );

        if (result == PasswordVerificationResult.Failed)
        {
            return new ServerResponse<AuthResponse>
            {
                Success = false,
                Message = "Incorrect password"
            };
        }

        var jwt = GenerateJwt(user, out var expiresAt);

        var refreshToken = GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(30);

        await _context.SaveChangesAsync();

        return new ServerResponse<AuthResponse>
        {
            Success = true,
            Message = "Login successful",
            Data = new AuthResponse
            {
                Token = jwt,
                ExpiresAt = expiresAt,
                RefreshToken = refreshToken,
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            }
        };
    }

    private string GenerateJwt(
        User user,
        out DateTime expiresAt)
    {
        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                user.Id.ToString()
            ),
            new Claim(
                ClaimTypes.Name,
                user.Name
            ),
            new Claim(
                ClaimTypes.Email,
                user.Email
            ),
            new Claim(
                ClaimTypes.Role,
                user.Role
            )
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!
            )
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        expiresAt = DateTime.UtcNow.AddHours(4);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }

    private string GenerateRefreshToken()
    {
        return Convert.ToHexString(RandomNumberGenerator.GetBytes(254));
    }

    public async Task<ServerResponse<AuthResponse>> RefreshTokenAsync(string refreshToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

        if (user == null)
        {
            return new ServerResponse<AuthResponse>
            {
                Success = false,
                Message = "Invalid refresh token"
            };
        }

        if (user.RefreshTokenExpiresAt == null ||
            user.RefreshTokenExpiresAt < DateTime.UtcNow)
        {
            return new ServerResponse<AuthResponse>
            {
                Success = false,
                Message = "Refresh token expired"
            };
        }

        var newJwt = GenerateJwt(user, out var expiresAt);
        var newRefreshToken = GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);

        await _context.SaveChangesAsync();

        return new ServerResponse<AuthResponse>
        {
            Success = true,
            Message = "Token refreshed",
            Data = new AuthResponse
            {
                Token = newJwt,
                ExpiresAt = expiresAt,
                RefreshToken = newRefreshToken,
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            }
        };
    }
}
