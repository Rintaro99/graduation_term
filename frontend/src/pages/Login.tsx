import { useState } from "react";
import { api } from "../api/client";
import { auth } from "../lib/auth";
import { useNavigate, useOutletContext, useLocation, Link } from "react-router-dom";
import { Button } from "flowbite-react";
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
    <div className="max-w-150 w-full mx-auto mt-15">
      <h2 className="text-3xl">ログイン</h2>

      {/* 成功メッセージ・エラーメッセージ両方まとめてここに出す */}
      {msg && (
        <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }} className="text-red-500">
          {msg}
        </pre>
      )}
      
      <form onSubmit={onSubmit} className="mt-10 grid gap-4">
        <label className="grid gap-2">
          <span>メール</span>
          <input value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="example@example.com"
            className="text-black" />
        </label>
        <label className="grid gap-2">
          <span>パスワード</span>
          <input value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="abc1234"
            className="text-black" />
        </label>
        <div className="flex mt-10 justify-center">
          <Button type="submit" color="indigo" className="dark:hover:bg-indigo-800 w-45" >送信</Button>
          <Button as={ Link } to="/" color="pink" className="w-45 ml-10">トップページへ戻る</Button>
        </div>
        <Button as={Link} to="/forgot-password" className="text-blue-600 underline">パスワードを忘れた？</Button>
        
      </form>
    </div>
  );
}
