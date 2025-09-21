import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "flowbite-react";
import type { AdminUser } from "../types/Admin";
import { useAdminUsers } from "../hooks/useAdminUsers";

export default function AdminUserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAdminUsers();

  const [form, setForm] = useState<Partial<AdminUser>>({
    name: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token || !id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: AdminUser) => {
        setForm({ name: data.name || "", email: data.email || "" });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const updated = await updateUser(Number(id), form);
    if (updated) {
      navigate(`/admin/users/${id}`);
    }
  };

  return (
    <div className="max-w-150 w-full mx-auto mt-15">
      <h1 className="text-3xl font-bold">ユーザー編集</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        <div className="grid gap-3">
          <label className="block text-sm font-medium mb-1">名前</label>
          <input
            type="text"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-black"
          />
        </div>

        <div className="grid gap-3">
          <label className="block text-sm font-medium mb-1">メール</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-black"
          />
        </div>

        <div className="flex gap-2 mt-6 justify-center">
          <Button type="submit" color="blue">
            更新
          </Button>
          <Button as={Link} to={`/admin/users/${id}`} color="gray">
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  );
}
