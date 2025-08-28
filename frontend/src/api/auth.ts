import { api } from "./client";

const SIGN_IN_PATH = "/api/api_users/sign_in";
const SIGN_UP_PATH = "/api/api_users";
const SIGN_OUT_PATH = "/api/api_users/sign_out";

// Devise (devise-jwt) 前提。payload は api_user キー。
export type Credentials = { email: string; password: string };

export async function signIn(cred: Credentials): Promise<string> {
  const res = await api.post(SIGN_IN_PATH, { api_user: cred });
  // axios は header 名を小文字化するので authorization を見る
  const authHeader = (res.headers as any)["authorization"] as string | undefined;
  if (!authHeader) {
    throw new Error("Authorization ヘッダが返ってきません（CORSの expose-headers も確認）");
  }
  const token = authHeader.replace(/^Bearer\s+/i, "");
  // ★ localStorage に保存
  localStorage.setItem("auth_token", token);

  return token;
}

export async function signUp(cred: Credentials): Promise<void> {
  await api.post(SIGN_UP_PATH, { api_user: cred });
  // 多くの構成で sign_up 直後はトークンは返りません（自動ログインしない）。
  // その場合は signIn を続けて呼ぶ運用にします（UI側で制御）。
}

export async function signOut(): Promise<void> {
  await api.delete(SIGN_OUT_PATH); // Authorization は axios の interceptor が付けます
  // ★ localStorage のトークン削除
  localStorage.removeItem("auth_token");
}

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}
