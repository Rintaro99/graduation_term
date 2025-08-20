import { api } from "./client";
import { QuestionSchema, type Question } from "../schemas/quiz";

export async function fetchRandomQuestion(): Promise<Question> {
  // バックエンドに合わせて /api/questions/1 などに変えてもOK
  const res = await api.get("/api/questions/random");
  return QuestionSchema.parse(res.data);
}

export async function fetchQuestion(id: number | string): Promise<Question> {
  const res = await api.get(`/api/questions/${id}`);
  return QuestionSchema.parse(res.data);
}
