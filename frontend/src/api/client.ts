import axios from "axios";
import { auth } from "../lib/auth";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim()|| "NO_ENV_VALUE";
  (window as any).__DEBUG_API_BASE_URL__ = baseURL;
export const api = axios.create({
  baseURL,
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
    const message =err.response?.data?.error || err.message || "";

    // 🌐 タイムアウトエラー処理
    if (message.includes("timeout")) {
      alert("サーバーとの通信がタイムアウトしました。\nしばらく待ってから再度お試しください。");
      return Promise.reject(err);
    }

    // トークン期限切れ or 認証切れ
    if (
      err.response?.status === 401 ||
      message.includes("Signature has expired")
    ) {
      // ログインAPIは除外
      if (!url.includes("/api/api_users/sign_in")) {
        alert("セッションが切れました。再度ログインしてください。");
        // トークンとユーザー情報を削除
        auth.clearToken?.();
        localStorage.removeItem("user");
        // ログイン画面へ遷移
        window.location.href = "/login?expired=1";
      }
    }
    return Promise.reject(err);
  }
);
