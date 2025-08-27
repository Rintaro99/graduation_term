import { z } from "zod";

export const ChoiceSchema = z.object({
  id: z.number(),
  content: z.string(),
});

export const QuestionSchema = z.object({
  id: z.number(),
  content: z.string(),
  choices: z.array(ChoiceSchema),
  explanation: z.string().optional(),
});

export type Choice = z.infer<typeof ChoiceSchema>;
export type Question = z.infer<typeof QuestionSchema>;
