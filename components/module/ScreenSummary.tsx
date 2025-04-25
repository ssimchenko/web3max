import { Button } from "@/components/ui/Button";
import { module1 } from "@/lib/content";
import { SimpleExplanation } from "./SimpleExplanation";

export function ScreenSummary() {
  const s = module1.steps.summary;
  return (
    <div>
      <div className="inline-flex items-center gap-2 bg-success-soft text-success px-4 py-2 rounded-full font-semibold">
        <span aria-hidden="true">✓</span>
        Готово
      </div>
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{s.title}</h2>
      <p className="mt-4 text-lg">{s.lead}</p>

      <ul className="mt-6 space-y-3">
        {s.bullets.map((b, i) => (
          <li
            key={b}
            className="flex items-start gap-3 bg-white rounded-card p-4 border border-ink/10"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0"
            >
              {i + 1}
            </span>
            <span className="text-base leading-snug">{b}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-lg text-ink-soft">{s.next}</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href={s.nextHref} variant="primary">
          {s.nextLabel}
        </Button>
        <Button href="/hub" variant="secondary">
          {s.home}
        </Button>
      </div>

      <SimpleExplanation text={s.simpleExplanation} />
    </div>
  );
}
