import { fetchQuestions, type Question } from '../api/quizApi'

export async function getQuestions(): Promise<Question[]> {
  return await fetchQuestions(10)
}