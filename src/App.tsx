import { useEffect, useState } from 'react'

import QuestionCard from './components/QuestionCard'
import Results from './components/Results'
import ProgressBar from './components/ProgressBar'
import CategorySelector from './components/CategorySelector'

import {
  fetchCategories,
  fetchQuestions,
  type Category,
  type Question,
} from './api/quizApi'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null)

  const [difficulty, setDifficulty] = useState<
    'easy' | 'medium' | 'hard' | null
  >(null)

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  // Load categories
  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories()
      setCategories(data)
      setLoadingCategories(false)
    }

    load()
  }, [])

  // Load questions when category + difficulty selected
  useEffect(() => {
    if (!selectedCategory || !difficulty) return

    const load = async () => {
      setLoadingQuestions(true)

      const data = await fetchQuestions(
        10,
        selectedCategory.id,
        difficulty
      )

      setQuestions(data)

      setCurrentQuestion(0)
      setScore(0)
      setShowResults(false)
      setSelectedAnswer(null)
      setIsAnswered(false)

      setLoadingQuestions(false)
    }

    load()
  }, [selectedCategory, difficulty])

  const handleAnswer = (answer: string) => {
    if (!questions.length) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    if (answer === questions[currentQuestion].answer) {
      setScore((s) => s + 1)
    }
  }

  const nextQuestion = () => {
    const next = currentQuestion + 1

    if (next < questions.length) {
      setCurrentQuestion(next)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const restart = () => {
    setSelectedCategory(null)
    setDifficulty(null)
    setQuestions([])
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  // Loading categories
  if (loadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading categories...
      </div>
    )
  }

  // CATEGORY SCREEN
  if (!selectedCategory) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="category"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center p-6 text-white"
      >
        <div className="w-full max-w-xl space-y-6">
          <h1 className="text-3xl font-bold text-center">
            Choose Category
          </h1>

          <CategorySelector
            categories={categories}
            onSelect={setSelectedCategory}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

  // DIFFICULTY SCREEN
if (!difficulty) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="difficulty"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center text-white p-6"
      >
        <div className="w-full max-w-xl text-center space-y-6">
          <h1 className="text-3xl font-bold">
            Choose Difficulty
          </h1>

          <div className="grid gap-4">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setDifficulty(
                    level as 'easy' | 'medium' | 'hard'
                  )
                }
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl capitalize"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

  // Loading questions
  if (loadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading questions...
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
  <AnimatePresence mode="wait">
    <motion.div
      key="quiz"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6"
    >
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-2xl">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Quiz App
        </h1>

        {!showResults && (
          <ProgressBar
            current={currentQuestion}
            total={questions.length}
          />
        )}

        {showResults ? (
          <Results
            score={score}
            total={questions.length}
            onRestart={restart}
          />
        ) : currentQ ? (
          <QuestionCard
            question={currentQ}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            score={score}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
          />
        ) : (
          <div className="text-center">
            Preparing question...
          </div>
        )}
      </div>
    </motion.div>
  </AnimatePresence>
)
}