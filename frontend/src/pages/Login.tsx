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

console.log("VITE_API_BASE_URL (from Login):", import.meta.env.VITE_API_BASE_URL);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useOutletContext<ContextType>();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const expired = params.get("expired");

  const [msg, setMsg] = useState<string | null>(
    expired
    ? "セッションが切れました。再度ログインしてください。"
    : (location.state as { message?: string })?.message || null
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
    <div className="max-w-100 sm:max-w-150 w-full mx-auto mb:mt-15 mt-10">
      <h2 className="text-3xl">ログイン</h2>
      {/* 成功メッセージ・エラーメッセージ両方まとめてここに出す */}
      {msg && (
        <pre
          style={{ marginTop: 12, whiteSpace: "pre-wrap" }}
          className={
            msg.includes("完了") ? "text-green-500" : "text-red-500"
          }
        >
          {msg}
        </pre>
      )}
      
      <form onSubmit={onSubmit} className="mt-5 mb:mt-10 grid gap-4">
        <label className="grid gap-2">
          <span>メール</span>
          <input value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="example@example.com"
            className="text-black w-80 mx-auto sm:w-full" />
        </label>
        <label className="grid gap-2">
          <span>パスワード</span>
          <input value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="abc1234"
            className="text-black w-80 mx-auto sm:w-full" />
        </label>
        <div className="flex mt-10 justify-center">
          <Button type="submit" color="indigo" className="dark:hover:bg-indigo-800 w-35 sm:w-45" >送信</Button>
          <Button as={ Link } to="/" color="pink" className="w-35 sm:ml-10 ml-5 sm:w-45">トップページへ戻る</Button>
        </div>
        <Button as={Link} to="/forgot-password" className="text-blue-600 underline">パスワードを忘れた？</Button>
        
      </form>
    </div>
  );
}
