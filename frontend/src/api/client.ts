import axios from "axios";
import { auth } from "../lib/auth";

const baseURL = (import.meta.env.VITE_API_BASE_URL ?? '').trim();

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 15000,
});

// リクエスト時にトークンを付与
api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


// レスポンス共通処理
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    if (err.response?.status === 401) {
      // ログインAPIは除外
      if (!url.includes("/api/api_users/sign_in")) {
        auth.clearToken?.();
        window.location.href = "/login?expired=1";
      }
    }
    return Promise.reject(err);
  }
);
