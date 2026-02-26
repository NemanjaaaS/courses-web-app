import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';
import { TOKEN_STORAGE_KEY } from '../pages/auth/user/userSlice';

const apiUrl = import.meta.env.VITE_API_URL;

let navigate: NavigateFunction | undefined;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

let tokenInterceptor: number | null = null;

export const setBearerToken = async (token: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem('refresh_token', refreshToken);

  if (tokenInterceptor !== null) {
    axiosInstance.interceptors.request.eject(tokenInterceptor);
  }

  tokenInterceptor = axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const unsetBearerToken = async () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);

  if (tokenInterceptor !== null) {
    axiosInstance.interceptors.request.eject(tokenInterceptor);
    tokenInterceptor = null;
  }
};

// Default request interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');

        const res = await axios.post(`${apiUrl}/auth/refresh?refreshToken=${refreshToken}`, {
          refreshToken,
        });

        const newToken = res.data.authenticationToken;

        localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
        await setBearerToken(newToken, res.data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch {
        unsetBearerToken();
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem('refresh_token');
        navigate?.('/login');
      }
    }

    return Promise.reject(error);
  }
);

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export default axiosInstance;
