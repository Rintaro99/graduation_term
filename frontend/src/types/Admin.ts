export type AdminUser = {
  id: number;
  name: string;
  email: string;
  score: number;
  symbols: string[];
  title?: string | null;
  favorites?: AdminFavorite[];
};

export type AdminFavorite = {
  id: number;
  user: { id: number; name: string | null; email: string };
  post: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    api_user: {
      id: number;
      name: string | null;
      email: string;
    };
  };
};
