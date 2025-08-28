import { useEffect, useState } from "react";
import { getToken } from "../api/auth";

type Choice = {
  id: number;
  content: string;
  is_correct: boolean;
};

type Question = {
  id: number;
  content: string;
  explanation: string;
  choices: Choice[];
};

export default function QuizPlay() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<"question" | "explanation" | "finished">("question");
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = getToken();
      const res = await fetch("http://localhost:3000/api/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // 10問シャッフルして保持
      const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 10);
      setQuestions(shuffled);
    };
    fetchQuestions();
  }, []);

  if (mode === "finished") {
    return (
      <div>
        <h2>クイズ終了！</h2>
        <p>スコア: {score} 点</p>
        {/* 後でここで /api/challenges に POST */}
      </div>
    );
  }

  if (questions.length === 0) return <p>読み込み中...</p>;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (choice: Choice) => {
    setLastChoice(choice);
    if (choice.is_correct) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setMode("explanation");
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setMode("finished");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setMode("question");
    }
  };

  if (mode === "question") {
    return (
      <div>
        <h2>問題 {currentIndex + 1}</h2>
        <p>{currentQuestion.content}</p>
        <ul>
          {currentQuestion.choices.map((choice) => (
            <li key={choice.id}>
              <button onClick={() => handleAnswer(choice)}>
                {choice.content}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (mode === "explanation") {
    return (
      <div>
        <h2>解説</h2>
        <p>
          {isCorrect ? "✅ 正解！" : "❌ 不正解…"}
        </p>
        <p>あなたの回答: {lastChoice?.content}</p>
        <p>正解: {currentQuestion.choices.find(c => c.is_correct)?.content}</p>
        <p>{currentQuestion.explanation}</p>
        <button onClick={handleNext}>次へ</button>
      </div>
    );
  }
}

