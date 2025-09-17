import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { AdminUser } from "../types/Admin";
import { Button } from "flowbite-react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import dayjs from "dayjs";

export default function AdminUserShow() {
  const { id } = useParams();
  const [user, setUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();
  const { deleteUser } = useAdminUsers();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    fetch(`http://localhost:3000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  if (!user) return <p>読み込み中...</p>;

  return (
    <div className="max-w-150 mx-auto w-full mt-15">
      <h1 className="text-3xl font-bold">{user.name || "名無し"}</h1>
      <div className="mt-5 grid gap-3">
        <p>Email: {user.email}</p>
        <p>スコア: {user.score}</p>
        <p>称号: {user.title || "なし"}</p>
        <p>シンボル: {user.symbols.join(", ") || "なし"}</p>
      </div>
      <div className="flex gap-2 mt-7 justify-center">
        {/* 編集 */}
        <Button as={Link} to={`/admin/users/${user.id}/edit`} color="yellow">
          編集
        </Button>
        {/* 削除 */}
        <Button
          color="red"
          onClick={() => deleteUser(user.id, () => navigate("/admin/users"))}
        >
          削除
        </Button>
        {/* 一覧に戻る */}
      </div>
      <Link to="/admin/users" className="text-white hover:underline block mt-7 text-left">
        ← ユーザー一覧へ戻る
      </Link>

      {/* お気に入り一覧 */}
      <h2 className="text-xl font-bold mt-15">お気に入り投稿一覧</h2>
      <div className="grid gap-4 mt-5 shadow-lg">
        {user.favorites?.length ? (
          user.favorites.map((fav) => (
            <div key={fav.id} className="border rounded p-2 shadow">
              <Link
                to={`/posts/${fav.post.id}`}
                className="font-bold"
              >
                {fav.post.title}
                <p className="text-sm text-gray-500 mt-1">
                  {dayjs(fav.post.created_at).format("YYYY/MM/DD HH:mm")}
                </p>
                <p className="text-gray-400">{fav.post.content}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="mt-5">お気に入りはありません</p>
        )}
      </div>
    </div>
  );
}
