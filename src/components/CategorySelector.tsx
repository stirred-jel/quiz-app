import type { Category } from '../api/quizApi'

type Props = {
  categories: Category[]
  onSelect: (category: Category) => void
}

export default function CategorySelector({
  categories,
  onSelect,
}: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Choose Category
      </h1>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-left transition"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}