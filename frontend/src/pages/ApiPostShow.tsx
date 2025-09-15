import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { usePostFavorite } from "../hooks/usePostFavorite";
import type { User } from "../types/User";
import type { ApiPost } from "../types/ApiPost";

export default function ApiPostShow() {
  const { id } = useParams();
  const [post, setPost] = useState<ApiPost | null>(null);
  const { toggleFavorite } = usePostFavorite();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // 投稿取得
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

  // ユーザー情報取得（admin判定）
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    fetch("http://localhost:3000/api/mypage", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((data: User) => setUser(data))
      .catch(console.error);
  }, []);

  // 投稿削除機能
  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;

    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:3000/api/api_posts/${post?.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("削除しました");
        navigate("/posts"); // 削除後に一覧へ戻る
      } else {
        const err = await res.json();
        alert(err.error || "削除に失敗しました");
      }
    } catch {
      alert("通信エラーが発生しました");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <p>読み込み中...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        投稿者: {post.api_user.name || post.api_user.email}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        投稿日: {new Date(post.created_at).toLocaleString()}<br />
        更新日: {new Date(post.updated_at).toLocaleString()}
      </p>
      <button onClick={() => toggleFavorite(post, setPost)}>
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

      {/* 管理者だけ編集ボタン */}
      {user?.admin && (
        <Link
          to={`/posts/${post.id}/edit`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
        >
          投稿を編集
        </Link>
      )}

      {/* 管理者だけ削除ボタン */}
      {user?.admin && (
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          投稿を削除
        </button>
      )}

      <Link
        to="/posts"
        className="text-blue-500 hover:underline"
      >
        ← 投稿一覧へ戻る
      </Link>
    </div>
  );
}
