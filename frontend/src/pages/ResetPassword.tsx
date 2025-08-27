import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: 16 }}>
      <h2>パスワード再設定</h2>
      {errors.map((m, i) => (
        <div key={i} style={{ color: "red" }}>・{m}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <div>
          <label>新しいパスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード確認</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  );
}
