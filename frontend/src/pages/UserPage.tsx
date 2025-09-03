import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import { Link } from "react-router-dom";


type UserData = {
  id: number;
  name: string;
  title: string;
  symbols: string[];
  symbol_img?: string | null;
};

export default function UserPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) return;

    fetch("http://localhost:3000/api/mypage", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then((data: UserData) => {
        console.log("DEBUG mypage data:", data);
        setUser(data);
        })
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>{user.name || "名無し"} さんのページ</h2>
      <p>称号: {user.title || "なし"}</p>
      {user.symbol_img ? (
        <div>
            <img
            src={`/${user.symbol_img}`}
            alt={user.title || "シンボル"}
            width={150}
            />
        </div>
        ) : (
        <p>シンボル: なし</p>
        )}

      <Link to="/quiz">クイズに挑戦</Link>
      <Link to="/ranking">ランキング</Link>
      <Link to="/user/edit">プロフィール編集</Link>
    </div>
  );
}
