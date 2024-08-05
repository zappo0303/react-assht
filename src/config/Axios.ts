
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : null;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance