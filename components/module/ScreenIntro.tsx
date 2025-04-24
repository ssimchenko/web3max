import { module1 } from "@/lib/content";
import { SimpleExplanation } from "./SimpleExplanation";

export function ScreenIntro() {
  const s = module1.steps.intro;
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">{s.title}</h2>
        <div className="mt-5 space-y-4 text-lg text-ink leading-relaxed">
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <SimpleExplanation text={s.simpleExplanation} />
      </div>
      <LockIllustration />
    </div>
  );
}

function LockIllustration() {
  return (
    <div className="mx-auto w-full max-w-xs aspect-square" aria-hidden="true">
      <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="240" height="240" rx="28" fill="#dbeafe" />
        <g transform="translate(60 50)">
          <path
            d="M30 50 V40 a30 30 0 0 1 60 0 V50"
            stroke="#1a2332"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="10" y="50" width="100" height="90" rx="14" fill="#2563eb" />
          <circle cx="60" cy="90" r="10" fill="#fff" />
          <rect x="56" y="92" width="8" height="22" rx="3" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
