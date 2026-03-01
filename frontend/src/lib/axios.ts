import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60 * 5,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    if (refreshToken) config.headers['x-refresh-token'] = refreshToken;

    config.headers = {
      ...config.headers,
    } as InternalAxiosRequestConfig['headers'];

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;
