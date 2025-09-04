import { signOut } from "../api/auth";
import { useNavigate } from "react-router-dom";

type Props = {
  asLink?: boolean;
  onLogout?: () => void;
};

export default function LogoutButton({ asLink = false, onLogout }: Props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      alert("ログアウトしました");
      onLogout?.();
      navigate("/login");
    } catch (err) {
      alert("ログアウトに失敗しました");
    }
  };

  if (asLink === true) {
    // ナビゲーション用（リンク風）
    return (
      <button
        onClick={handleLogout}
        style={{
          background: "none",
          border: "none",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
          padding: 0,
        }}
      >
        ログアウト
      </button>
    );
  }

  // ページ用（ボタン風）
  return (
    <button onClick={handleLogout}>
      ログアウト
    </button>
  );
}


