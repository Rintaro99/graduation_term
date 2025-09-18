import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import LogoutButton from "../components/LogoutButton";
import { Button } from "flowbite-react";


export default function UserUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/mypage")
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setMessage("");
      })
      .catch(() => setMessage("ユーザー情報の取得に失敗しました"));
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーションチェック
    if (!name.trim() || !email.trim()) {
      setMessage("名前とメールは必須です");
      return;
    }

    api.patch("/api/mypage", { user: { name, email } })
      .then(() => setMessage("プロフィールを更新しました"))
      .catch(() => setMessage("更新に失敗しました"));
  };

  return (
    <div className="mt-5 sm:mt-15 w-full max-w-150 mx-auto">
      <h2 className="mt-10 text-3xl font-bold">プロフィール編集</h2>
      <div className="mt-5">
        {message && (
          <p
            className={message.includes("失敗") || message.includes("必須") || message.includes("不正")
              ? "text-red-500"
              : "text-green-600"}
          >
            {message}
          </p>
        )}
      </div>
      <form onSubmit={onSubmit} className="grid gap-5 mt-5">
        <div className="grid gap-3">
          <label>名前</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-white text-black"
          />
        </div>
        <div className="grid gap-3">
          <label>メール</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="p-2 bg-white text-black w-full"
          />
        </div>
        <Link to="/forgot-password" className="text-blue-600 underline text-xl">パスワードをリセット</Link>
        <Button type="submit" color="indigo" className="dark:hover:bg-indigo-800 w-30 mx-auto">更新</Button>
      </form>
      <div className="mt-3">
        <div className="flex justify-center mt-5">
          <LogoutButton />
          <Button as={ Link }  to="/user" className="ml-7 bg-cyan-700 hover:bg-cyan-800" style={{ fontFamily: "'Dela Gothic One', cursive" }}>トップに戻る</Button>
        </div>
        </div>
    </div>
  );
}
