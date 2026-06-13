import axios from "axios";
import authStorage from "../utilities/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5220";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStorage.getRefreshToken();

        if (!refreshToken) {
          authStorage.clear();
          window.dispatchEvent(new Event("auth:logout"));
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          { refreshToken }
        );

        const { token, refreshToken: newRefreshToken } =
          refreshResponse.data.data;

        authStorage.setTokens(token, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return apiClient(originalRequest);
      } catch (err) {
        authStorage.clear();
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
