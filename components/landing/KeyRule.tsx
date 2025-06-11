import { landing } from "@/lib/content";
import { ShieldIllustration } from "@/components/landing/icons";

export function KeyRule() {
  return (
    <section className="py-12 sm:py-16 border-t border-ink/10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase tracking-widest text-sm text-accent mb-3">
            {landing.keyRule.label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold leading-snug">
            {landing.keyRule.text}
          </p>
          <p className="mt-5 text-lg text-ink-soft max-w-2xl">
            {landing.keyRule.note}
          </p>
        </div>
        <div className="text-accent justify-self-start lg:justify-self-end">
          <ShieldIllustration className="w-32 h-32 sm:w-40 sm:h-40" />
        </div>
      </div>
    </section>
  );
}
