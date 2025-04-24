import { module1 } from "@/lib/content";
import { SimpleExplanation } from "./SimpleExplanation";

export function ScreenThreats() {
  const s = module1.steps.threats;
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold">{s.title}</h2>
      <p className="mt-4 text-lg text-ink-soft max-w-2xl">{s.lead}</p>
      <p className="mt-2 text-base text-ink-soft max-w-2xl">{s.body}</p>

      <ol className="mt-8 grid gap-4">
        {s.steps.map((step) => (
          <li
            key={step.num}
            className="flex items-start gap-4 bg-white rounded-card p-4 border border-ink/10"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0"
            >
              {step.num}
            </span>
            <div>
              <p className="font-semibold leading-snug">{step.heading}</p>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <SimpleExplanation text={s.simpleExplanation} />
    </div>
  );
}
