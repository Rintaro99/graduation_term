import { useNavigate } from "react-router-dom";
import type { AdminUser } from "../types/Admin";

export function useAdminUsers() {
  const navigate = useNavigate();

  // ユーザー削除
  const deleteUser = async (id: number, onSuccess?: () => void) => {
    if (!window.confirm("このユーザーを削除しますか？")) return;
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("削除しました");
      if (onSuccess) onSuccess();
    } else {
      alert("削除に失敗しました");
    }
  };

  // ユーザー編集
  const updateUser = async (id: number, data: Partial<AdminUser>) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ api_user: data }),
    });

    if (res.ok) {
      const json = await res.json();
      alert("更新しました");
      return json.user as AdminUser; // 更新後のユーザー返す
    } else {
      alert("更新に失敗しました");
      return null;
    }
  };

  return { deleteUser, updateUser };
}
