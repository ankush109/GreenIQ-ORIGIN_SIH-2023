import axios from "axios";

const BACKEND_URL ="http://localhost:5000/v1" 
const API_URL = BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

const token = localStorage.getItem("token"); // Corrected method

const apiWithAccessToken = axios.create({
  baseURL: API_URL, // Assuming you want the same base URL as API_URL
  headers: {
    Authorization: `Bearer ${token}`, // Added Bearer scheme and corrected token usage
  },
});

// Exporting both instances as named exports
export { api, apiWithAccessToken };
