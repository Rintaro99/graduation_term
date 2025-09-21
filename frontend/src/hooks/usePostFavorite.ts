import type { ApiPost } from "../types/ApiPost";

/**
 * 投稿のお気に入りをトグルするカスタムフック
 */
export function usePostFavorite() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const toggleFavorite = async (
    post: ApiPost,
    setPost?: React.Dispatch<React.SetStateAction<ApiPost | null>>,
    setPosts?: React.Dispatch<React.SetStateAction<ApiPost[]>>
  ) => {
    const url = `${API_BASE}/api/api_posts/${post.id}/favorite`;
    const method = post.favorited ? "DELETE" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });

    if (res.ok) {
      // 単体用 (詳細ページ)
      if (setPost) {
        setPost({ ...post, favorited: !post.favorited });
      }

      // リスト用 (一覧ページ)
      if (setPosts) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, favorited: !post.favorited } : p
          )
        );
      }
    }
  };

  return { toggleFavorite };
}
