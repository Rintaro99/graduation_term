import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";
import { UserCreateSchema, type UserCreateInput } from "../schemas/user";
import { useNavigate, Link } from "react-router-dom";

export default function UserNew() {
  const [form, setForm] = useState<UserCreateInput>({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      // 一覧を最新化
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // ログインページへ
      // navigate("/login", { replace: true });
      navigate("/login", { state: { message: "ユーザー登録が完了しました！ログインしてください。" } });
    },
    onError: (err: any) => {
      // Railsの422: { errors: ["..."] }
      const fromServer: string[] | undefined = err?.response?.data?.errors;
      if (fromServer?.length) {
        setErrors(fromServer);
      } else {
        setErrors([err?.message ?? "作成に失敗しました"]);
      }
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const parsed = UserCreateSchema.safeParse(form);
    if (!parsed.success) {
      const msgs = parsed.error.issues.map((i) => i.message);
      setErrors(msgs);
      return;
    }
    mutation.mutate(parsed.data);
  };

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h2 style={{ marginBottom: 12 }}>New User</h2>

      {errors.length > 0 && (
        <div style={{ color: "crimson", marginBottom: 12 }}>
          {errors.map((m, i) => <div key={i}>・{m}</div>)}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="example@example.com"
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="6+ characters"
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span>Name (optional)</span>
          <input
            type="text"
            value={form.name ?? ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </label>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
          <Link to="/login">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
