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
}
