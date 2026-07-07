// utils/axiosClient.ts
import axios from 'axios';

const API_BASE = 'https://founderthrive-cabf912c3adc.herokuapp.com/api/v1';

let accessToken = ''; // Store in memory

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const axiosClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // To send cookies like refreshToken
});

axiosClient.interceptors.request.use((config) => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // Prevent infinite loop
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosClient.patch('/auth/refresh');
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error('🔁 Refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
