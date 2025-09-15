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
    <li className="mb-3 border-b pb-2 flex justify-between">
      <Link to={`/posts/${post.id}`} className="block w-full">
        <p className="text-xs text-gray-400 text-left">
          {new Date(post.created_at).toLocaleString()}
        </p>
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="text-gray-400 mt-2">
          {post.content.length > 30
            ? post.content.slice(0, 30) + "..."
            : post.content}
        </p>
        {/* <p className="text-sm text-gray-500">
          投稿者: {post.api_user.name || post.api_user.email}
        </p> */}
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault(); // ← 投稿詳細ページへの遷移を止める
          console.log("お気に入りクリック:", post.id, post.favorited);
          onToggleFavorite(post.id, !!post.favorited);
        }}
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
