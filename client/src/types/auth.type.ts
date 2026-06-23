export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isInitializing: boolean;
};

export type AuthResponse = {
  token: string;
  expiresAt: string;
  refreshToken: string;
  user: User;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<ServerResponse<User>>;
  logout: () => void;
  setAuthResponse: (response: AuthResponse) => void;
};

export type AuthFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type ServerResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
};
