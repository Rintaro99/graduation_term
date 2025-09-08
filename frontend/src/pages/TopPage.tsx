import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="mt-10">
      <h1 className="text-5xl font-zen" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>りんって書ける？</h1>

      <div className="mt-5">
        <Link to="/login" className="btn btn-primary mr-4">ログイン</Link>
        <Link to="/users/new">新規登録</Link>
      </div>

      <div style={{ marginTop: 40 }}>
        <Link to="/terms" style={{ marginRight: 16 }}>利用規約</Link>
        <Link to="/privacy">プライバシーポリシー</Link>
      </div>
      <div className="bg-foobar text-white p-4">テスト</div>
    </div>
  );
}
