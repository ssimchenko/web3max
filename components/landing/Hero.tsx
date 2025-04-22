import { Button } from "@/components/ui/Button";
import { landing } from "@/lib/content";

export function Hero() {
  return (
    <section className="px-6 sm:px-10 pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto grid gap-10 sm:gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {landing.hero.title}
          </h1>
          <p className="mt-5 text-lg text-ink-soft max-w-xl">
            {landing.hero.lead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/hub" variant="primary">
              {landing.hero.primaryCta}
            </Button>
            <Button href="#why" variant="secondary">
              {landing.hero.secondaryCta}
            </Button>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-sm aspect-[4/5]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#fef9f3" />
          </linearGradient>
        </defs>
        <rect width="320" height="400" rx="32" fill="url(#bg)" />

        <g transform="translate(95 70)">
          <rect width="130" height="240" rx="22" fill="#ffffff" stroke="#1a2332" strokeWidth="3" />
          <rect x="14" y="30" width="102" height="14" rx="4" fill="#dbeafe" />
          <rect x="14" y="56" width="80" height="10" rx="4" fill="#e2e8f0" />
          <rect x="14" y="76" width="102" height="44" rx="10" fill="#dcfce7" />
          <circle cx="34" cy="98" r="10" fill="#16a34a" />
          <path d="M30 99 l3 3 l7 -7" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="50" y="92" width="56" height="6" rx="3" fill="#16a34a" opacity="0.4" />
          <rect x="50" y="103" width="40" height="6" rx="3" fill="#16a34a" opacity="0.25" />

          <rect x="14" y="132" width="102" height="44" rx="10" fill="#fee2e2" />
          <circle cx="34" cy="154" r="10" fill="#dc2626" />
          <path d="M30 150 l8 8 m0 -8 l-8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="50" y="148" width="56" height="6" rx="3" fill="#dc2626" opacity="0.4" />
          <rect x="50" y="159" width="40" height="6" rx="3" fill="#dc2626" opacity="0.25" />

          <rect x="14" y="188" width="102" height="32" rx="8" fill="#f1f5f9" />
        </g>

        <g transform="translate(220 250)">
          <circle r="40" fill="#2563eb" />
          <path
            d="M0 -20 L18 -10 L18 8 C18 18 10 26 0 30 C-10 26 -18 18 -18 8 L-18 -10 Z"
            fill="#ffffff"
          />
          <path d="M-7 2 L-2 8 L8 -4" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
