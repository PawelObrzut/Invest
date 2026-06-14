using server.DTOs;

namespace server.Services;

public interface IAuthService
{
    Task<ServerResponse<UserDto>> RegisterAsync(
        RegisterRequest request
    );

    Task<ServerResponse<AuthResponse>> LoginAsync(
        LoginRequest request
    );

    Task<ServerResponse<AuthResponse>> RefreshTokenAsync(
        string refreshToken
    );

    Task<ServerResponse<AuthResponse>> LogoutAsync(
        string refreshToken
    );
}
