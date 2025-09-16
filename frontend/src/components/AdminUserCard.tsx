import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import type { AdminUser } from "../types/Admin";

type Props = {
  user: AdminUser;
  onDelete: (id: number) => void;
};

export default function AdminUserCard({ user, onDelete }: Props) {
  return (
    <div className="border rounded p-4 shadow-lg text-center">
      <p>
        <b>{user.name || "名無し"}</b> ({user.email})
      </p>
      <p>スコア: {user.score}</p>
      <p>称号: {user.title || "なし"}</p>
      <p>シンボル: {user.symbols.join(", ") || "なし"}</p>

      <div className="flex gap-2 mt-4 justify-center">
        {/* 編集 */}
        <Button as={Link} to={`/admin/users/${user.id}/edit`} color="yellow">
          編集
        </Button>
        {/* 削除 */}
        <Button color="red" onClick={() => onDelete(user.id)}>
          削除
        </Button>
        {/* 詳細 */}
        <Button as={Link} to={`/admin/users/${user.id}`} color="blue">
          詳細
        </Button>
      </div>
    </div>
  );
}
