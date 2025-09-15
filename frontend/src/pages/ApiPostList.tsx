import { useEffect, useState } from "react";
import ApiPostItem from "../components/ApiPostItem";
import type { ApiPost } from "../types/ApiPost";
import { usePostFavorite } from "../hooks/usePostFavorite";
import PostForm from "../pages/PostForm";
import type { User } from "../types/User";
import { Link } from "react-router-dom";

const PER_PAGE = 10;

export default function ApiPostList() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [page, setPage] = useState(1);
  const { toggleFavorite } = usePostFavorite();
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 投稿のトグル
  const handleToggle = (id: number, favorited: boolean) => {
    const post = posts.find((p) => p.id === id);
    if (post) toggleFavorite(post, undefined, setPosts);
  };

  // 投稿一覧を取得
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3000/api/api_posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const postsWithFav = data.map((p: any) => ({
          ...p,
          favorited: p.favorited,
        }));
        setPosts(postsWithFav);
      }
    };
    fetchPosts();
  }, []);

  // ユーザー情報を取得（admin判定用）
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    fetch("http://localhost:3000/api/mypage", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: User) => setUser(data))
      .catch(console.error);
  }, []);

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const pagePosts = posts.slice(start, end);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">投稿一覧</h1>
      {user?.admin && (
        <Link
          to="/posts/new"
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          新規投稿
        </Link>
      )}
      <ul>
        {pagePosts.map((post) => (
          <ApiPostItem
            key={post.id}
            post={post}
            onToggleFavorite={handleToggle}
          />
        ))}
      </ul>

      {/* ページネーション */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          前へ
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={end >= posts.length}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          次へ
        </button>
      </div>
    </div>
  );
}
