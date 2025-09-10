import { useEffect, useState } from "react";
import { getToken } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

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
  const [mode, setMode] = useState<"question" | "explanation" >("question");
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const navigate = useNavigate();

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

  const handleFinish = async () => {
    const token = getToken();
    const res = await fetch("http://localhost:3000/api/challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score }),
    });
    const data = await res.json();
    // 結果ページに遷移し、スコアと結果を渡す
    navigate("/result", { state: { score, result: data } });
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      handleFinish();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setMode("question");
    }
  };


  if (mode === "question") {
    return (
      <div className="w-full max-w-150 mx-auto mt-15">
        <h2 className="text-3xl text-left" style={{ fontFamily: "'Kaisei Tokumin', serif" }}>問題 {currentIndex + 1}</h2>
        <p className="mt-7">{currentQuestion.content}</p>
        <ul className="mt-5">
          {currentQuestion.choices.map((choice) => (
            <li className="mt-2" key={choice.id}>
              <Button color="gray" className="mx-auto" onClick={() => handleAnswer(choice)}>
                {choice.content}
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-5">問題 {currentIndex + 1} / {questions.length}</p>
        <div className="mt-3 bg-white" style={{ borderRadius: "8px", overflow: "hidden", height: "10px" }}>
          <div
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              background: "#4caf50",
              height: "100%"
            }}
          />
        </div>
      </div>
    );
  }

  if (mode === "explanation") {
    return (
      <div>
        <h2>解説</h2>
        <p style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>
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

