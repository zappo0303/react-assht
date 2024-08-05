
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/", 
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