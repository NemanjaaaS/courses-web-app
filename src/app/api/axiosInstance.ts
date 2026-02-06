import { toast } from 'react-toastify';
import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';
import { TOKEN_STORAGE_KEY } from '../pages/auth/user/userSlice';

const apiUrl = import.meta.env.VITE_API_URL;

let navigate: NavigateFunction | undefined;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

let tokenInterceptor: number | null = null;

export const setBearerToken = async (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

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
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      toast.error('Unauthorized');
      navigate?.('/login');
    }

    // console.error(i18next.t('GENERAL.ERROR.API_ERROR'));
    return Promise.reject(error);
  }
);

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export default axiosInstance;
