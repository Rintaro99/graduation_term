import { useState } from "react";
import { api } from "../api/client";
import { auth } from "../lib/auth";
import { useNavigate, useOutletContext, useLocation, Link } from "react-router-dom";
// import { signIn } from "../api/auth"; // ← api/auth から
// import { auth } from "../lib/auth";   // ← lib/auth から

type ContextType = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useOutletContext<ContextType>();
  const navigate = useNavigate();
  const location = useLocation();
  const [msg, setMsg] = useState<string | null>(
    (location.state as { message?: string })?.message || null
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await api.post("/api/api_users/sign_in", {
        api_user: { email, password },
      });
      const authHeader =
        (res.headers as any)["authorization"] ?? (res.headers as any)["Authorization"];
      if (!authHeader) { setMsg("Authorization ヘッダが見えません"); return; }

      const token = String(authHeader).replace(/^Bearer\s+/i, "");
      auth.setToken(token);
      setIsLoggedIn(true);
      navigate("/user", { replace: true });
    } catch (err: any) {
      const m = err?.response?.data?.error || err?.message || "ログイン失敗";
      setMsg(`ERROR: ${m}`);
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 420, margin: "0 auto" }}>
      <h2>ログイン（学習用：保存はまだしない）</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>メール</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>パスワード</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ width: "100%", padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: "8px 12px" }}>送信</button>
        <div style={{ marginTop: 12 }}>
          <Link to="/forgot-password">パスワードを忘れた？</Link>
        </div>
        
      </form>

      {/* 成功メッセージ・エラーメッセージ両方まとめてここに出す */}
      {msg && (
        <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
          {msg}
        </pre>
      )}
    </div>
  );
}
