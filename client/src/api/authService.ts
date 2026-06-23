import axios from "axios";
import apiClient from "./apiClient";
import type { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest, ServerResponse, User } from "../types/auth.type";

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
  ): Promise<ServerResponse<User>> => {
    try {
      const response = await apiClient.post<ServerResponse<User>>(
        "/api/auth/register",
        { name, email, password } as RegisterRequest
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        throw new Error(backendMessage || error.message || "Registration failed");
      }
      throw error;
    }
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

  logout: async (refreshToken: string): Promise<void> => {
    const response = await apiClient.post<ServerResponse<AuthResponse>>(
      "/api/auth/logout",
      { refreshToken }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Logout failed");
    }
  },
};
