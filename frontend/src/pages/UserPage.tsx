import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import type { User } from "../types/User";

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) return;

    fetch("http://localhost:3000/api/mypage", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then((data: User) => {
        console.log("DEBUG mypage data:", data);
        setUser(data);
        })
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>読み込み中...</p>;

  return (
    <div className="max-w-150 w-full mx-auto mt-5 sm:mt-10 grid gap-2">
      <div className="">
        <h2 style={{ fontFamily: "'Rampart One', cursive" }} className="text-3xl sm:text-5xl">{user.name || "名無し"}</h2>
      </div>
      {user.symbol_img ? (
        <div className="mt-7 relative before:content-[''] before:absolute before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:w-70 before:h-20 before:rounded-full before:bg-black/40 before:blur-xl">
          <img
          src={`/${user.symbol_img}`}
          alt={user.title || "シンボル"}
          width={150}
          className="mx-auto w-50 sm:w-70 relative z-10"
          />
        </div>
        ) : (
        <p>シンボル: なし</p>
      )}
      <div className="bg-[url('/name_frame.png')] bg-contain bg-center bg-no-repeat mt-5">
        <p style={{ fontFamily: "'Kaisei Tokumin', serif" }} className="text-2xl sm:text-4xl font-kaisei">{user.title || "なし"}</p>
      </div>

      <div className="mt-5 flex justify-center">
        <Button as={ Link } to="/quiz" color="amber" style={{ fontFamily: "'Dela Gothic One', cursive" }} className="text-xl bg-red-700 hover:bg-red-800">クイズに挑戦</Button>
        <Button as={ Link } to="/ranking" color="amber" style={{ fontFamily: "'Dela Gothic One', cursive" }} className="text-xl ml-5 sm:ml-10 bg-orange-700 hover:bg-orange-800">ランキング</Button>
      </div>
      <div className="text-right mt-5 sm:pr-10">
        <Link to="/posts" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }} className="text-base text_white border-b text-right">りんの日常 →</Link>
      </div>
    </div>
  );
}
