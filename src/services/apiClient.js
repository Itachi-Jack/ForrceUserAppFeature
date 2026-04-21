import axios from "axios";

const BASE_URL = "http://192.168.0.120:8000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;