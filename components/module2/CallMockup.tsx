export function CallMockup({ from, text }: { from: string; text: string }) {
  return (
    <div className="rounded-card overflow-hidden border border-ink/10 shadow-sm bg-gradient-to-b from-slate-800 to-slate-900 text-white max-w-md mx-auto">
      <div className="px-6 py-10 text-center">
        <p className="text-sm uppercase tracking-widest text-white/60">
          Входящий вызов
        </p>
        <div className="mt-4 mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold">
          {from.charAt(0).toUpperCase()}
        </div>
        <p className="mt-4 text-2xl font-semibold">{from}</p>
        <p className="mt-1 text-sm text-white/60">+7 (4XX) ХХХ-ХХ-ХХ</p>
      </div>

      <div className="bg-slate-900/60 px-5 py-4 border-t border-white/10">
        <p className="text-sm text-white/70 mb-1">Что вам говорят:</p>
        <p className="text-base leading-snug">«{text}»</p>
      </div>

      <div className="flex">
        <div className="flex-1 py-4 bg-danger flex items-center justify-center gap-2 text-white font-semibold">
          <span aria-hidden="true">✕</span> Отбой
        </div>
        <div className="flex-1 py-4 bg-success flex items-center justify-center gap-2 text-white font-semibold">
          <span aria-hidden="true">✓</span> Ответить
        </div>
      </div>
    </div>
  );
}
