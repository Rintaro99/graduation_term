import { Link } from "react-router-dom";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import type { ApiPost } from "../types/ApiPost";

// export type ApiPost = {
//   id: number;
//   title: string;
//   content: string;
//   api_user: { id: number; name: string | null; email: string };
//   favorited?: boolean;
// };

type Props = {
  post: ApiPost;
  onToggleFavorite: (id: number, favorited: boolean) => void; // ← 型を明示
};

export default function ApiPostItem({ post, onToggleFavorite }: Props) {
  return (
    <li className="mb-6 border-b pb-2">
      <Link to={`/posts/${post.id}`} className="block">
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="text-gray-700">
          {post.content.length > 50
            ? post.content.slice(0, 50) + "..."
            : post.content}
        </p>
        <p className="text-sm text-gray-500">
          投稿者: {post.api_user.name || post.api_user.email}
        </p>
        <p className="text-xs text-gray-400">
          投稿日: {new Date(post.created_at).toLocaleString()}<br />
          更新日: {new Date(post.updated_at).toLocaleString()}
        </p>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault(); // ← 投稿詳細ページへの遷移を止める
          console.log("お気に入りクリック:", post.id, post.favorited);
          onToggleFavorite(post.id, !!post.favorited);
        }}
        className="ml-4"
      >
        {post.favorited ? (
          <HeartSolid className="w-6 h-6 text-red-500 transition-transform duration-300 transform hover:scale-110" />
        ) : (
          <HeartOutline className="w-6 h-6 text-gray-400 transition-transform duration-300 transform hover:scale-110" />
        )}
      </button>
    </li>
  );
}
