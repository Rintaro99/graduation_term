import { useState } from "react";
import { auth } from "../lib/auth";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


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
    <form onSubmit={handleSubmit} className="max-w-150 w-full mx-auto mt-15 grid gap-4">
      <h3 className="text-3xl">新規投稿</h3>
      {message && <p className="mb-2 text-green-500">{message}</p>}
      <div className="mt-5 grid gap-2">
        <label className="block text-xl">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded text-black"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="block text-xl">本文</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded bg-white text-black"
          rows={4}
          required
        />
      </div>

      <Button
        type="submit"
        color="blue"
        className="mt-5 w-40 mx-auto cursor:pointer font-bold"
      >
        投稿する
      </Button>
      <Link
        to="/posts"
        className="text-white-500 hover:underline text-left mt-15 font-bold"
      >
        ← 投稿一覧へ戻る
      </Link>
    </form>
  );
}
