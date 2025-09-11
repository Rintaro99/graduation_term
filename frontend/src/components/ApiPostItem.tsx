import { Link } from "react-router-dom";

type ApiPost = {
  id: number;
  title: string;
  content: string;
  api_user: { id: number; name: string | null; email: string };
};

export default function ApiPostItem({ post }: { post: ApiPost }) {
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
      </Link>
    </li>
  );
}
