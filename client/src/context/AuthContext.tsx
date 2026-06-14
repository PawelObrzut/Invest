import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { authService } from "../api/authService";
import authStorage from "../utilities/authStorage";

import type {
  AuthContextType,
  AuthResponse,
  AuthState,
} from "../types/auth.type";


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isLoading: false,
    isInitializing: true,
  });

  useEffect(() => {
    const stored = authStorage.load();

    setState({
      user: stored.user,
      token: stored.token,
      refreshToken: stored.refreshToken,
      isLoading: false,
      isInitializing: false,
    });
  }, []);

  const setAuthResponse = (response: AuthResponse) => {
    authStorage.save(response);

    setState((prev) => ({
      ...prev,
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken,
      isLoading: false,
      isInitializing: false,
    }));
  };

  const login = async (email: string, password: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.login(email, password);
      setAuthResponse(response);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.register(name, email, password);
      setAuthResponse(response);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async () => {
    const refreshToken = authStorage.getRefreshToken();
    
    try {
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      authStorage.clear();
      setState({
        user: null,
        token: null,
        refreshToken: null,
        isLoading: false,
        isInitializing: false,
      });
    }
  };

  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    refreshToken: state.refreshToken,
    isAuthenticated: Boolean(state.user && state.token),
    isLoading: state.isLoading,
    login,
    register,
    logout,
    setAuthResponse,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};