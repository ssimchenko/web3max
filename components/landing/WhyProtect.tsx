import { landing } from "@/lib/content";
import { Icon } from "@/components/landing/icons";

export function WhyProtect() {
  return (
    <section id="why" className="py-12 sm:py-16 border-t border-ink/10">
      <h2 className="text-2xl sm:text-3xl font-bold">{landing.whyProtect.title}</h2>
      <p className="mt-4 text-lg text-ink-soft max-w-2xl">
        {landing.whyProtect.body}
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {landing.whyProtect.bullets.map((b) => (
          <li
            key={b.text}
            className="flex items-center gap-4 bg-white rounded-card p-4 border border-ink/10"
          >
            <span className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-full bg-danger-soft text-danger">
              <Icon name={b.icon} className="w-6 h-6" />
            </span>
            <span className="text-lg">{b.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
