// src/pages/ResultPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

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
    <div className="w-full max-w-150 mx-auto mt-10 grid gap-3">
      <h2 className="text-2xl">クイズ終了！!</h2>
      <p>スコア: 
        <span className="text-5xl pl-3 font-black text-amber-500" style={{fontFamily: "'M PLUS Rounded 1c', sans-serif"}}>{score} 点</span>
      </p>
      {result.symbol_img && (
        <div className="mt-5 relative before:content-[''] before:absolute before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:w-70 before:h-20 before:rounded-full before:bg-black/40 before:blur-xl">
          <img
            src={`/${result.symbol_img}`}
            alt={result.achievement}
            width={150}
            className="mx-auto w-70 relative z-10"
          />
        </div>
      )}
      <div className="bg-[url('/name_frame.png')] bg-contain bg-center bg-no-repeat mt-5">
        <p style={{ fontFamily: "'Kaisei Tokumin', serif" }} className="text-4xl font-kaisei">{result.achievement}</p>
      </div>

      <div className="flex justify-between mt-8">
        <Button  onClick={() => navigate("/quiz")} style={{ fontFamily: "'Dela Gothic One', cursive" }} className="text-lg bg-red-700 hover:bg-red-800">もう一度プレイ</Button>
        <Button onClick={() => navigate("/ranking")} style={{ fontFamily: "'Dela Gothic One', cursive" }} className="text-lg ml-10 bg-orange-700 hover:bg-orange-800">ランキングを見る</Button>
        <Button onClick={() => navigate("/user")} style={{ fontFamily: "'Dela Gothic One', cursive" }} color="" className="text-lg mx-auto bg-cyan-700 hover:bg-cyan-800">トップに戻る</Button>
      </div>
    </div>
  );
}
