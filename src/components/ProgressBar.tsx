type Props = {
  current: number
  total: number
}

export default function ProgressBar({
  current,
  total,
}: Props) {
  const percent = ((current + 1) / total) * 100

  return (
    <div className="w-full bg-slate-700 h-3 rounded-full mb-4">
      <div
        className="bg-blue-500 h-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}