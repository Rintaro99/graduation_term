import { useEffect, useState } from "react";
import type { AdminUser } from "../types/Admin";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAdminUsers } from "../hooks/useAdminUsers";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const { deleteUser } = useAdminUsers();

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
            {/* 編集 */}
              <Button as={Link} to={`/admin/users/${user.id}/edit`} color="yellow">
                編集
              </Button>
            {/* 削除 */}
              <Button color="red" onClick={() => deleteUser(user.id)}>
                削除
              </Button>
            {/* 詳細へ */}
              <Button as={Link} to={`/admin/users/${user.id}`} color="blue">
                詳細
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
