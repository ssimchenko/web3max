export function ChatMockup({
  from,
  text,
  contactInitial,
}: {
  from: string;
  text: string;
  contactInitial?: string;
}) {
  const initial = contactInitial ?? from.charAt(0).toUpperCase();
  return (
    <div className="rounded-card overflow-hidden border border-ink/10 shadow-sm bg-white max-w-md mx-auto">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-ink/10">
        <div
          className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{from}</p>
          <p className="text-xs text-ink-soft">в сети</p>
        </div>
      </div>

      <div className="px-4 py-6 bg-[#f0f4f8] min-h-[180px] flex flex-col gap-2">
        <div className="self-start max-w-[85%] bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <p className="text-base leading-snug">{text}</p>
          <p className="text-xs text-ink-soft mt-1.5 text-right">10:42</p>
        </div>
      </div>

      <div className="px-3 py-3 bg-white border-t border-ink/10 flex items-center gap-2">
        <div className="flex-1 h-10 rounded-full bg-slate-100" />
        <div
          className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white"
          aria-hidden="true"
        >
          ➤
        </div>
      </div>
    </div>
  );
}
