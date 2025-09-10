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
    api.patch("/api/mypage", { user: { name, email } })
      .then(() => setMessage("プロフィールを更新しました"))
      .catch(() => setMessage("更新に失敗しました"));
  };

  return (
    <div className="mt-15 w-full max-w-150 mx-auto">
      <h2 className="mt-10 text-3xl font-bold">プロフィール編集</h2>
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
        <Button as={Link} to="/forgot-password" className="text-blue-600 underline text-xl">パスワードをリセット</Button>
      </form>
      <div className="mt-3">
        {message && (
          <p
            style={{
                color: message.includes("失敗") ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
        <Button type="submit" color="indigo" className="dark:hover:bg-indigo-800 w-30 mx-auto">更新</Button>
        <div className="flex justify-center mt-5">
          <LogoutButton />
          <Button as={ Link }  to="/user" className="ml-7 bg-cyan-700 hover:bg-cyan-800" style={{ fontFamily: "'Dela Gothic One', cursive" }}>トップに戻る</Button>
        </div>
        </div>
    </div>
  );
}
