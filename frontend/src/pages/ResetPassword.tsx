import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("reset_password_token");

  console.log("from URL param:", token);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      await axios.put("/api/api_users/password", {
        api_user: {
          reset_password_token: token,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      alert("パスワードを更新しました！");
      navigate("/login"); // ログイン画面へリダイレクトなど
    } catch (err: any) {
      const msgs: string[] = err?.response?.data?.errors ?? [err.message];
      setErrors(msgs);
    }
  };

  return (
    <div className="max-w-150 w-full mx-auto mt-15 grid gap-8">
      <h2 className="text-3xl">パスワード再設定</h2>
      {errors.map((m, i) => (
        <div key={i} style={{ color: "red" }}>・{m}</div>
      ))}
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-3">
          <label className="block">新しいパスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="abc1234"
            className="text-black"
          />
        </div>
        <div className="grid gap-3">
          <label className="block">パスワード確認</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="abc1234"
            className="text-black"
          />
        </div>
        <Button type="submit" color="indigo" className="w-40 mx-auto dark:hover:bg-indigo-800" >更新</Button>
      </form>
    </div>
  );
}
