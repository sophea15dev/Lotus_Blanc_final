import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // ✅ IMPORTANT FIX
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - token may be expired");
    }

    if (error.response?.status === 404) {
      console.error("API route not found:", error.config.url);
    }

    return Promise.reject(error);
  }
);

export default api;