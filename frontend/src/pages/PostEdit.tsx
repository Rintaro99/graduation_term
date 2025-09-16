import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { auth } from "../lib/auth";
import { Button } from "flowbite-react";

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
    <div className="max-w-150 w-full mx-auto mt-15 grid gap-4">
      <h2 className="text-3xl">投稿を編集</h2>
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleSubmit}>
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

        <div className="grid gap-2 mt-5">
          <label className="block text-x">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded bg-white text-black"
            rows={4}
            required
          />
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            color="blue"
            type="submit"
            className=""
          >
            更新する
          </Button>
          <Button
          as={ Link }
            to={`/posts/${id}`}
            color="gray"
            className=""
          >
            戻る
          </Button>
        </div>
      </form>
    </div>
  );
}
