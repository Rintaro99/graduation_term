export type ApiPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string; 
  api_user: { id: number; name: string | null; email: string };
  favorited?: boolean;
};
