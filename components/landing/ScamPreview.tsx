import { landing } from "@/lib/content";

export function ScamPreview() {
  const { title, lead, body, items } = landing.destructive;

  return (
    <section className="px-6 sm:px-10 py-16 sm:py-20 bg-white/60">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        <p className="mt-4 text-lg text-ink-soft max-w-2xl">{lead}</p>
        <p className="mt-2 text-base text-ink-soft max-w-2xl">{body}</p>

        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-ink/50">
          Примеры такого воздействия
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-3 rounded-card p-4 bg-white border border-ink/10"
            >
              <span className="text-xl mt-0.5" aria-hidden="true">
                {item.icon}
              </span>
              <p className="text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-soft max-w-2xl">
          Если вы заметили что-то подобное, лучше сразу проверить настройки безопасности и предупредить близких.
        </p>
      </div>
    </section>
  );
}
