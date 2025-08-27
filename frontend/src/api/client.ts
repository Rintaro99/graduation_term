import axios from "axios";
import { auth } from "../lib/auth";

const baseURL = (import.meta.env.VITE_API_BASE_URL ?? '').trim();

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
