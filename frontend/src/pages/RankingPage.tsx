import { useEffect } from "react";
import { getRanking } from "../api/ranking";

export default function RankingPage() {
  useEffect(() => {
    getRanking()
      .then((data) => {
        console.log("🎯 APIレスポンス:", data);
      })
      .catch((err) => {
        console.error("❌ APIエラー:", err);
      });
  }, []);

  return <h2>ランキングページ（確認用）</h2>;
}
