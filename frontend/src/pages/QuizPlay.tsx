import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomQuestion } from "../api/questions";

export default function QuizPlay() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["quiz", "current"],
    queryFn: fetchRandomQuestion,
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (error) {
    const message =
      (error as any)?.response?.data?.message ??
      (error as Error)?.message ??
      "エラーが発生しました";
    return (
      <div style={{ color: "crimson", padding: 16, whiteSpace: "pre-wrap" }}>
        {message}
      </div>
    );
  }
  if (!data) return <div style={{ padding: 16 }}>問題が見つかりません</div>;

  return (
    <div style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, marginBottom: 12 }}>クイズ</h2>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{data.content}</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {data.choices.map((c) => {
            const active = selectedId === c.id;
            return (
              <li key={c.id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    background: active ? "#eef6ff" : "white",
                    cursor: "pointer",
                  }}
                >
                  {c.content}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setSelectedId(null)} style={{ padding: "8px 12px" }}>
          クリア
        </button>
        <button onClick={() => { setSelectedId(null); refetch(); }} style={{ padding: "8px 12px" }}>
          次の問題（仮）
        </button>
      </div>
    </div>
  );
}
