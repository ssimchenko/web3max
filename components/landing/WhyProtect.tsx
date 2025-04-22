import { landing } from "@/lib/content";

export function WhyProtect() {
  return (
    <section id="why" className="px-6 sm:px-10 py-16 sm:py-20 bg-sand">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold">{landing.whyProtect.title}</h2>
        <p className="mt-4 text-lg text-ink-soft max-w-2xl">
          {landing.whyProtect.body}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {landing.whyProtect.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 bg-white rounded-card p-4 border border-amber-100"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-block w-2 h-2 rounded-full bg-danger flex-shrink-0"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
