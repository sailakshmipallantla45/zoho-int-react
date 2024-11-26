import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to automatically include the Authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
