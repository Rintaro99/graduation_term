export type User = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  title?: string;
  symbols: string[];
  symbol_img?: string | null;
};