import type { Question } from '../api/quizApi'

type Props = {
  question: Question
  currentQuestion: number
  totalQuestions: number
  score: number
  selectedAnswer: string | null
  isAnswered: boolean
  onAnswer: (answer: string) => void
  onNext: () => void
}

export default function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  score,
  selectedAnswer,
  isAnswered,
  onAnswer,
  onNext,
}: Props) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p>
          Question {currentQuestion + 1} / {totalQuestions}
        </p>
        <p>Score: {score}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">
        {question.question}
      </h2>

      <div className="grid gap-3">
        {question.options.map((opt) => {
          const isCorrect = opt === question.answer
          const isSelected = opt === selectedAnswer

          return (
            <button
              key={opt}
              disabled={isAnswered}
              onClick={() => onAnswer(opt)}
              className={`
                p-3 rounded-xl text-left
                ${
                  !isAnswered
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : isCorrect
                    ? 'bg-green-600'
                    : isSelected
                    ? 'bg-red-600'
                    : 'bg-slate-700'
                }
              `}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <button
          onClick={onNext}
          className="mt-4 w-full bg-blue-500 p-3 rounded-xl"
        >
          Next
        </button>
      )}
    </div>
  )
}