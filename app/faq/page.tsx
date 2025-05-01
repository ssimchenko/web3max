import { SiteHeader } from "@/components/SiteHeader";
import { faq } from "@/lib/content";

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
      <section className="px-6 sm:px-10 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">{faq.title}</h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl">{faq.subtitle}</p>

          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {faq.items.map((item, i) => (
              <details
                key={i}
                className="group py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-2">
                  <span className="text-lg font-medium text-ink leading-snug">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 group-open:bg-accent group-open:text-white flex items-center justify-center font-bold transition-colors"
                  >
                    <span className="block group-open:hidden">+</span>
                    <span className="hidden group-open:block">−</span>
                  </span>
                </summary>
                <div className="mt-3 pr-10 text-base text-ink-soft leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
