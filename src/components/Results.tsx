type Props = {
  score: number
  total: number
  onRestart: () => void
}

export default function Results({
  score,
  total,
  onRestart,
}: Props) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">
        Quiz Finished!
      </h2>

      <p className="mb-6">
        Score: {score} / {total}
      </p>

      <button
        onClick={onRestart}
        className="bg-blue-500 px-6 py-3 rounded-xl"
      >
        Restart
      </button>
    </div>
  )
}