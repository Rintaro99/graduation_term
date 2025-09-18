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
