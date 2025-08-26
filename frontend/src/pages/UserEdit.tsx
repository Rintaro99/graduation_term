import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "../api/users";
import { UserUpdateSchema, type UserUpdateInput } from "../schemas/user";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [form, setForm] = useState<UserUpdateInput>({
     email: "", 
     name: "", 
     password: "", 
     passwordConfirmation: ""
    });
  const [errors, setErrors] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setForm({
        email: data.email ?? "",
        name: (data.name ?? ""),
        password: undefined,
        passwordConfirmation: undefined,
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (input: UserUpdateInput) => updateUser(id!, input),
    onSuccess: (user) => {
      // 詳細＆一覧を最新化
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["users", id] });
      navigate(`/users/${user.id}`);
    },
    onError: (err: any) => {
      const msgs: string[] = err?.response?.data?.errors ?? [err?.message ?? "更新に失敗しました"];
      setErrors(msgs);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form before parse", form);

    setErrors([]);
    console.log("form before parse", form);
    const parsed = UserUpdateSchema.safeParse(form);
    if (!parsed.success) {
      console.log("zod issues", parsed.error.issues);
      setErrors(parsed.error.issues.map(i => i.message));
      setForm(f => ({ ...f, password: "", passwordConfirmation: "" }));
      return;
    }
    // const d = parsed.data;
    // const body: Record<string, unknown> = { email: d.email };
    // if (d.name !== undefined) body.name = d.name;
    // if (d.password) {
    // body.password = d.password;
    // body.password_confirmation = d.passwordConfirmation;
    // }
    // mutation.mutate({ user: body });
    mutation.mutate(parsed.data);
  };

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (error) {
    const msg = (error as any)?.response?.data?.message || (error as Error).message || "エラーが発生しました";
    return <div style={{ color: "crimson", padding: 16 }}>{msg}</div>;
  }

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h2 style={{ marginBottom: 12 }}>Edit User</h2>

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
            value={form.email ?? ""}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span>Name (optional)</span>
          <input
            type="text"
            value={form.name ?? ""}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span>Password (change if needed)</span>
          <input
            type="password"
            value={form.password ?? ""}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="leave blank to keep"
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
            <span>Confirm new password</span>
            <input
                type="password"
                value={form.passwordConfirmation ?? ""}
                onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
                placeholder="repeat the new password"
                autoComplete="new-password"
            />
        </label>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
          <Link to={`/users/${id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
