import { api } from "./client";
import { 
    UsersSchema, UserSchema, type User, 
    UserCreateSchema, type UserCreateInput,
    UserUpdateSchema, type UserUpdateInput,
} from "../schemas/user";

export async function listUsers(): Promise<User[]> {
  const res = await api.get("/api/api_users");
  return UsersSchema.parse(res.data);
}

export async function getUser(id: number | string): Promise<User> {
  const res = await api.get(`/api/api_users/${id}`);
  return UserSchema.parse(res.data);
}

// ▼ 追加：作成
export async function createUser(input: UserCreateInput): Promise<User> {
  // Rails 側は params.require(:user)... なので { user: input } で送る
  const parsed = UserCreateSchema.parse(input);
  const res = await api.post("/api/api_users", { api_user: parsed });
  return UserSchema.parse(res.data.user);
}

// ▼ 追加：更新
export async function updateUser(id: number | string, input: UserUpdateInput): Promise<User> {
  const parsed = UserUpdateSchema.parse(input);
  // 空文字は送らない & snake_case へ
//   const cleaned: Record<string, unknown> = { email: parsed.email };
//   if (parsed.name !== undefined) cleaned.name = parsed.name;
//   if (parsed.password) {
//     cleaned.password = parsed.password;
//     cleaned.password_confirmation = parsed.passwordConfirmation; // ←ここ重要
//   }
//   const res = await api.patch(`/api/api_users/${id}`, { user: cleaned });
//   return UserSchema.parse(res.data);

const cleaned: Record<string, unknown> = { email: input.email ?? "" };
  if (input.name !== undefined) cleaned.name = input.name;
  if (input.password) {
    cleaned.password = input.password;
    cleaned.password_confirmation = input.passwordConfirmation;
  }
  const res = await api.patch(`/api/api_users/${id}`, { user: cleaned });
  return UserSchema.parse(res.data);
}

// ▼ 追加：削除
export async function deleteUser(id: number | string): Promise<void> {
  await api.delete(`/api/api_users/${id}`);
}
