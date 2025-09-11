import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

type ApiPost = {
  id: number;
  title: string;
  content: string;
  api_user: { id: number; name: string | null; email: string };
  favorited?: boolean;
};

export default function ApiPostShow() {
  const { id } = useParams();
  const [post, setPost] = useState<ApiPost | null>(null);

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:3000/api/api_posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setPost(data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const toggleFavorite = async () => {
    if (!post) return;
    const url = `http://localhost:3000/api/api_posts/${post.id}/favorite`;
    const method = post.favorited ? "DELETE" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (res.ok) {
      setPost({ ...post, favorited: !post.favorited });
    }
  };

  if (!post) return <p>読み込み中...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        投稿者: {post.api_user.name || post.api_user.email}
      </p>
      <button onClick={toggleFavorite}>
        {post.favorited ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <HeartSolid className="w-8 h-8 text-red-500" />
          </motion.div>
        ) : (
          <HeartOutline className="w-8 h-8 text-gray-400" />
        )}
      </button>
      <Link
        to="/posts"
        className="text-blue-500 hover:underline"
      >
        ← 投稿一覧へ戻る
      </Link>
    </div>
  );
}
