// config/axios.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  withCredentials: true,
});

// ✅ Request Interceptor - Add token
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor - Handle token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove("access_token");

      // ✅ Reload the window
      if (typeof window !== "undefined") {
        window.location.reload(); // 🔁 reloads current page
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
