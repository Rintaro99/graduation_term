type ApiPost = {
  id: number;
  title: string;
  content: string;
  api_user: { id: number; name: string | null; email: string };
};

export default function ApiPostItem({ post }: { post: ApiPost }) {
  return (
    <li className="mb-6 border-b pb-2">
      <h2 className="text-lg font-semibold">
        {post.title.length > 30
          ? post.title.slice(0, 30) + "..."
          : post.title}
      </h2>
      <p className="text-gray-700">
        {post.content.length > 50
          ? post.content.slice(0, 50) + "..."
          : post.content}
        </p>
      <p className="text-sm text-gray-500">
        投稿者: {post.api_user.name || post.api_user.email}
      </p>
    </li>
  );
}
