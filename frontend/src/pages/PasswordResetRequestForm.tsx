import { useState } from "react";
import { api } from "../api/client";
import { Button } from "flowbite-react";

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/api_users/password",
        { api_user: { email } }, // ← body
        { headers: { "Accept": "application/json" } } // ← config
      );
      const serverMsg =
        res.data?.message ||
        "パスワード再設定用のメールを送信しました。メールをご確認ください。";
      setMsg(serverMsg);

    } catch (err: any) {
      // ✅ 失敗時も統一した安全メッセージを表示
      setMsg(
        "パスワード再設定用のメールを送信しました。メールをご確認ください。"
      );
    }
  };

  return (
    <div className="mt-15 max-w-150 w-full mx-auto grid gap-10">
      <h2 className="text-xl sm:text-3xl">パスワードリセットリクエスト</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          required
          className="text-black w-full"
        />
        <Button color="indigo" className="w-40 mx-auto mt-5 dark:hover:bg-indigo-800" type="submit">送信</Button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
