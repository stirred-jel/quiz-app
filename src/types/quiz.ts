export type Question = {
  question: string
  options: string[]
  answer: string
}

export type QuizCategory = {
  name: string
  questions: Question[]
}