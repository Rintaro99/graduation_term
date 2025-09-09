import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function HomePage() {
  return (
    <div className="mt-30">
      <h1 className="text-5xl font-zen" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>りんって書ける？</h1>

      <div className="mt-30 flex justify-center">
        <Button as={Link} to="/login" color="indigo" className="px-10 dark:hover:bg-indigo-800">ログイン</Button>
        <Button as={Link} to="/users/new" color="red" className="ml-20 px-10">新規登録</Button>
      </div>

      <div className="mt-10">
        <Link to="/terms" className="text-blue-600 underline">利用規約</Link>
        <Link to="/privacy" className="text-blue-600 underline ml-5">プライバシーポリシー</Link>
      </div>
    </div>

    
  );
}
