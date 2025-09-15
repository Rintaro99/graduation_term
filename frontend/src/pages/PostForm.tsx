import { useState } from "react";
import { auth } from "../lib/auth";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = auth.getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/api_posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ api_post: { title, content } }),
      });

      if (res.ok) {
        setMessage("投稿しました！");
        setTitle("");
        setContent("");
      } else {
        const err = await res.json();
        setMessage(err.error || err.errors?.join(", ") || "エラーが発生しました");
      }
    } catch (error) {
      setMessage("通信エラー");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6 p-4 border rounded shadow">
      <h3 className="text-xl mb-4">新規投稿</h3>

      {message && <p className="mb-2 text-red-500">{message}</p>}

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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        投稿する
      </button>
    </form>
  );
}
