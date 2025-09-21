import { useEffect, useState } from "react";
import type { AdminFavorite } from "../types/Admin";

export default function AdminFavoritesPage() {
  const [favorites, setFavorites] = useState<AdminFavorite[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    fetch(`${API_BASE}/api/admin/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setFavorites)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">お気に入り一覧</h1>
      <div className="grid gap-4">
        {favorites.map(fav => (
          <div key={fav.id} className="border rounded p-4 shadow">
            <p>ユーザー: {fav.user.name || fav.user.email}</p>
            <p>投稿: {fav.post.title}</p>
            <p className="text-xs text-gray-500">登録日時: {new Date(fav.post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
