import { useEffect, useState } from "react";
import type { AdminUser } from "../types/Admin";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAdminUsers } from "../hooks/useAdminUsers";
import AdminUserCard from "../components/AdminUserCard";

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
    <div className="max-w-150 mx-auto w-full mt-10 grid gap-3">
      <h1 className="text-3xl font-bold">ユーザー管理</h1>
      {/* 投稿管理ボタン */}
      <div className="grid gap-3 ml-auto">
        <Link 
          to="/posts" 
          className="text-white hover:underline text-sm"
        >
          投稿一覧へ→
        </Link>
        <Button as={Link} to="/posts/new" color="blue">
          新規投稿
        </Button>
      </div>
      <div className="grid gap-4 mt-4">
        {users.map((user) => (
          <AdminUserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
