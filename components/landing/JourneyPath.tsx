import { Button } from "@/components/ui/Button";
import { landing } from "@/lib/content";
import { Icon } from "@/components/landing/icons";

export function JourneyPath() {
  const { title, subtitle, steps, cta } = landing.path;

  return (
    <section className="py-12 sm:py-16 border-t border-ink/10">
      <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      <p className="mt-4 text-lg text-ink-soft max-w-2xl">{subtitle}</p>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2">
        {steps.map((step) => (
          <li
            key={step.num}
            className="relative bg-white rounded-card p-5 pt-6 border border-ink/10"
          >
            <span className="absolute -top-4 left-4 grid place-items-center w-9 h-9 rounded-full bg-accent text-white text-lg font-bold">
              {step.num}
            </span>
            <span className="grid place-items-center w-14 h-14 rounded-full bg-accent-soft text-accent mb-4">
              <Icon name={step.icon} className="w-7 h-7" />
            </span>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-base text-ink-soft">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
