import apiClient from "./apiClient";
import type { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest, ServerResponse } from "../types/auth.type";

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ServerResponse<AuthResponse>>(
      "/api/auth/login",
      { email, password } as LoginRequest
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }

    return response.data.data;
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<ServerResponse<AuthResponse>>(
      "/api/auth/register",
      { name, email, password } as RegisterRequest
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Registration failed");
    }

    return response.data.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ServerResponse<AuthResponse>>(
      "/api/auth/refresh",
      { refreshToken } as RefreshTokenRequest
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Token refresh failed');
    }

    return response.data.data;
  },
  // TODO: implement logout
};
