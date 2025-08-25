import { api } from "./client";
import { UsersSchema, UserSchema, type User, UserCreateSchema, type UserCreateInput } from "../schemas/user";

export async function listUsers(): Promise<User[]> {
  const res = await api.get("/api/users");
  return UsersSchema.parse(res.data);
}

export async function getUser(id: number | string): Promise<User> {
  const res = await api.get(`/api/users/${id}`);
  return UserSchema.parse(res.data);
}

// ▼ 追加：作成
export async function createUser(input: UserCreateInput): Promise<User> {
  // Rails 側は params.require(:user)... なので { user: input } で送る
  const parsed = UserCreateSchema.parse(input);       // 送信前にzodチェック
  const res = await api.post("/api/users", { user: parsed });
  return UserSchema.parse(res.data);
}