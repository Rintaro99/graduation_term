import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>アプリへようこそ！</h1>
      <p>ここからクイズを始めるためにログインまたは新規登録してください。</p>

      <div style={{ marginTop: 20 }}>
        <Link to="/login" style={{ marginRight: 16 }}>ログイン</Link>
        <Link to="/users/new">新規登録</Link>
      </div>

      <div style={{ marginTop: 40 }}>
        <Link to="/terms" style={{ marginRight: 16 }}>利用規約</Link>
        <Link to="/privacy">プライバシーポリシー</Link>
      </div>
    </div>
  );
}
