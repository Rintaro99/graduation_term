import { z } from "zod";

// 空文字や空白だけの文字列を undefined にするユーティリティ
const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema
  );


export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable().optional(), // ← nullを許可
});
export const UsersSchema = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;

// フォーム入力用
export const UserCreateSchema = z.object({
  email: z.string().email("メール形式で入力してください"),
  password: z.string().min(6, "6文字以上で入力してください"),
  name: z.string().trim().optional(), // name が無い環境でも通る形に
});
export type UserCreateInput = z.infer<typeof UserCreateSchema>;

// ▼ 追加：更新用（email は必須、password は任意入力時のみ6文字以上）
export const UserUpdateSchema = z.object({
  email: z.string().email("メール形式で入力してください"),
  name: emptyToUndefined(z.string().trim()).optional(),
  password: emptyToUndefined(z.string().min(6, "6文字以上で入力してください")).optional(),
  passwordConfirmation: emptyToUndefined(z.string()).optional(),
}).refine(
  (v) => !v.password || v.password === v.passwordConfirmation,
  { path: ["passwordConfirmation"], message: "パスワードが一致しません" }
);
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
