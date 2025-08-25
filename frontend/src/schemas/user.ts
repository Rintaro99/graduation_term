import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable().optional(), // ← nullを許可
});
export const UsersSchema = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = z.object({
  email: z.string().email("メール形式で入力してください"),
  password: z.string().min(6, "6文字以上で入力してください"),
  name: z.string().trim().optional(), // name が無い環境でも通る形に
});
export type UserCreateInput = z.infer<typeof UserCreateSchema>;
