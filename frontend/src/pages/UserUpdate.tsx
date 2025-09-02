import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

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
    <div style={{ padding: 16, maxWidth: 420, margin: "0 auto" }}>
      <h2>プロフィール編集</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>名前</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>メール</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <Link to="/forgot-password" style={{display: "block"}}>パスワードをリセットする</Link>
        <button type="submit" style={{}}>更新</button>
      </form>
      <div style={{ marginTop: 12 }}>
        {message && (
           <p
            style={{
                color: message.includes("失敗") ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
        <Link to="/">トップに戻る</Link>
        </div>
    </div>
  );
}
