import type { AuthResponse, User } from "../types/auth.type";

type StoredAuth = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
};

const safeParseUser = (value: string | null): User | null => {
  if (!value) return null;

  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
};

const authStorage = {
  save(response: AuthResponse) {
    localStorage.setItem("auth_user", JSON.stringify(response.user));
    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("auth_refresh_token", response.refreshToken);
  },

  load(): StoredAuth {
    return {
      user: safeParseUser(localStorage.getItem("auth_user")),
      token: localStorage.getItem("auth_token"),
      refreshToken: localStorage.getItem("auth_refresh_token"),
    };
  },

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  getRefreshToken(): string | null {
    return localStorage.getItem("auth_refresh_token");
  },

  setTokens(token: string, refreshToken: string) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_refresh_token", refreshToken);
  },

  clear() {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
  },
};

export default authStorage;