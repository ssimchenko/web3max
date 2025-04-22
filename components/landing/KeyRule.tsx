import { landing } from "@/lib/content";

export function KeyRule() {
  return (
    <section className="px-6 sm:px-10 py-16 sm:py-24 bg-accent text-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-widest text-sm text-white/80 mb-4">
          {landing.keyRule.label}
        </p>
        <p className="text-2xl sm:text-3xl font-bold leading-snug">
          {landing.keyRule.text}
        </p>
        <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto">
          {landing.keyRule.note}
        </p>
      </div>
    </section>
  );
}
