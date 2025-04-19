export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Шаг ${current} из ${total}`}
    >
      <div className="flex justify-between text-sm text-ink-soft mb-2">
        <span>
          Шаг {current} из {total}
        </span>
        <span aria-hidden="true">{Math.round(percent)}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
