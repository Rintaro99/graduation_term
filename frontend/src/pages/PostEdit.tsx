import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { auth } from "../lib/auth";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // 投稿の初期データを取得
  useEffect(() => {
    const token = auth.getToken();
    if (!token) return;

    fetch(`http://localhost:3000/api/api_posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => setMessage("読み込み失敗"));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = auth.getToken();
    if (!token) return;

    const res = await fetch(`http://localhost:3000/api/api_posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ api_post: { title, content } }),
    });

    if (res.ok) {
      alert("更新しました！");
      navigate(`/posts/${id}`); // 更新後に詳細ページへ戻す
    } else {
      const err = await res.json();
      setMessage(err.error || err.errors?.join(", "));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl mb-4">投稿を編集</h2>
      {message && <p className="mb-2 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            更新する
          </button>
          <Link
            to={`/posts/${id}`}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            戻る
          </Link>
        </div>
      </form>
    </div>
  );
}
