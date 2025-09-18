import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";
import { UserCreateSchema, type UserCreateInput } from "../schemas/user";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "flowbite-react";

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
    <div className="max-w-100 w-full mx-auto mt-10 sm:mt-15 sm:max-w-150">
      <h2 className="text-3xl">新規登録</h2>

      {errors.length > 0 && (
        <div style={{ color: "crimson", marginBottom: 12 }}>
          {errors.map((m, i) => <div key={i}>・{m}</div>)}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-5 grid gap-5">
        <label className="grid gap-2">
          <span>メアド</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="example@example.com"
            className="text-black w-80 mx-auto sm:w-full"
          />
        </label>

        <label className="grid gap-2">
          <span>パスワード</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="6文字以上"
            className="text-black w-80 mx-auto sm:w-full"
          />
        </label>

        <label className="grid gap-2">
          <span>ニックネーム</span>
          <input
            type="text"
            value={form.name ?? ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="りん"
            className="text-black w-80 mx-auto sm:w-full"
          />
        </label>

        <div className="flex justify-center mt-5">
          <Button color="dark" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create"}
          </Button>
          <Button as={Link} to="/" color="gray" className="ml-8 cursor-pointer">キャンセル</Button>
        </div>
      </form>
    </div>
  );
}
