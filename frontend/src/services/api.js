import axios from "axios";

/**
 * Axios instance configured for API calls
 * Automatically includes base URL and authentication headers
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    // Add Authorization header if token exists
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
