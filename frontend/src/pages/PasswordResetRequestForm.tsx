import { useState } from "react";
import { api } from "../api/client";

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        "/api/api_users/password",
        { api_user: { email } }, // ← body
        { headers: { "Accept": "application/json" } } // ← config
      );
      setMsg("リセット用のメールを送信しました。/letter_opener で確認してください。");
    } catch (err: any) {
      setMsg("送信に失敗しました。");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      <h2>パスワードリセットリクエスト</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button type="submit">送信</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
