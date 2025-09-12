export type ApiPost = {
  id: number;
  title: string;
  content: string;
  api_user: { id: number; name: string | null; email: string };
  favorited?: boolean;
};
