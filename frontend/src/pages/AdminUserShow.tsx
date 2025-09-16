import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { AdminUser } from "../types/Admin";
import { Button } from "flowbite-react";
import { useAdminUsers } from "../hooks/useAdminUsers";

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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{user.name || "名無し"}</h1>
      <p>Email: {user.email}</p>
      <p>スコア: {user.score}</p>
      <p>称号: {user.title || "なし"}</p>
      <p>シンボル: {user.symbols.join(", ") || "なし"}</p>

      <div className="flex gap-2 mt-4">
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
        <Button as={Link} to="/admin/users" color="gray">
          一覧へ戻る
        </Button>
      </div>

      {/* お気に入り一覧 */}
      <h2 className="text-xl font-bold mt-6 mb-2">お気に入り一覧</h2>
      <div className="grid gap-2">
        {user.favorites?.length ? (
          user.favorites.map(fav => (
            <div key={fav.id} className="border rounded p-2 shadow">
              <p>投稿: {fav.post.title}</p>
              <p className="text-sm text-gray-500">
                登録日時: {new Date(fav.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>お気に入りはありません</p>
        )}
      </div>

      <Link to="/admin/users" className="text-blue-500 hover:underline block mt-4">
        ← ユーザー一覧へ戻る
      </Link>
    </div>
  );
}
