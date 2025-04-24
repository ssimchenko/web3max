import { module1 } from "@/lib/content";
import { ChatMockup } from "./ChatMockup";
import { SimpleExplanation } from "./SimpleExplanation";

export function ScreenMainRule() {
  const s = module1.steps["main-rule"];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold">{s.title}</h2>

      <div className="mt-6 rounded-card bg-accent text-white p-6 sm:p-8">
        <p className="text-xl sm:text-2xl font-bold leading-snug">{s.rule}</p>
      </div>

      <p className="mt-6 text-lg text-ink-soft max-w-2xl">{s.body}</p>

      <div className="mt-8">
        <p className="text-sm uppercase tracking-wide text-ink-soft mb-3">
          Пример сообщения от мошенника:
        </p>
        <ChatMockup from={s.example.from} text={s.example.text} />
        <p className="mt-4 inline-block bg-danger-soft text-danger font-semibold px-4 py-2 rounded-btn">
          {s.example.verdict}
        </p>
      </div>

      <SimpleExplanation text={s.simpleExplanation} />
    </div>
  );
}
