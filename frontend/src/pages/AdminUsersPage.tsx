import { useEffect, useState } from "react";
import type { AdminUser } from "../types/Admin";
import { Button } from "flowbite-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    fetch("http://localhost:3000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("このユーザーを削除しますか？")) return;
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー管理</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="border rounded p-4 shadow">
            <p><b>{user.name || "名無し"}</b> ({user.email})</p>
            <p>スコア: {user.score}</p>
            <p>称号: {user.title || "なし"}</p>
            <p>シンボル: {user.symbols.join(", ") || "なし"}</p>
            <div className="flex gap-2 mt-2">
              <Button color="red" onClick={() => handleDelete(user.id)}>削除</Button>
              {/* 編集機能は後で追加 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
