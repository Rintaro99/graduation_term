// src/pages/ResultPage.tsx
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // QuizPlay から渡されるデータを受け取る
  const { score, result } = location.state || {};

  if (!result) {
    return (
      <div>
        <p>結果データがありません。</p>
        <button onClick={() => navigate("/quiz")}>クイズへ戻る</button>
      </div>
    );
  }

  return (
    <div>
      <h2>クイズ終了！</h2>
      <p>スコア: {score} 点</p>

      <h3>🏆 獲得した称号</h3>
      <p>{result.achievement}</p>
      {result.symbol_img && (
        <img
          src={`/${result.symbol_img}`}
          alt={result.achievement}
          width={150}
        />
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate("/quiz")}>もう一度プレイ</button>
        <button onClick={() => navigate("/ranking")}>ランキングを見る</button>
        <button onClick={() => navigate("/user")}>トップに戻る</button>
      </div>
    </div>
  );
}
