export type Question = {
  question: string
  options: string[]
  answer: string
}

export type Category = {
  id: number
  name: string
}

type OpenTDBQuestion = {
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

type OpenTDBResponse = {
  results: OpenTDBQuestion[]
}

function shuffle(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5)
}

function decodeHTML(html: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('https://opentdb.com/api_category.php')
  const data = await res.json()
  return data.trivia_categories
}

export async function fetchQuestions(
  amount = 10,
  categoryId?: number,
  difficulty?: 'easy' | 'medium' | 'hard'
): Promise<Question[]> {
  const url = new URL('https://opentdb.com/api.php')

  url.searchParams.append('amount', String(amount))
  url.searchParams.append('type', 'multiple')

  if (categoryId) {
    url.searchParams.append('category', String(categoryId))
  }

  if (difficulty) {
    url.searchParams.append('difficulty', difficulty)
  }

  const res = await fetch(url.toString())
  const data: OpenTDBResponse = await res.json()

  return data.results.map((q) => {
    const answers = [
      ...q.incorrect_answers,
      q.correct_answer,
    ]

    return {
      question: decodeHTML(q.question),
      answer: q.correct_answer,
      options: shuffle(answers.map(decodeHTML)),
    }
  })
}