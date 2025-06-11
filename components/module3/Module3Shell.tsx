"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { module4, type MessengerModule } from "@/lib/content";
import {
  clearM3,
  readM3,
  readMessengerPrefs,
  writeM3,
  writeMessengerPrefs,
} from "@/lib/progress";
import Image from "next/image";
import { MessengerMockScreen } from "./MessengerMockScreen";

const NEXT_HREF: Record<MessengerModule["id"], string> = {
  max: "/module-3/telegram",
  telegram: "/module-3/whatsapp",
  whatsapp: "/module-4",
};

export function Module3Shell({ data }: { data: MessengerModule }) {
  const total = data.steps.length + 2;
  const INTRO = 0;
  const CONCLUSION = total - 1;

  const [step, setStep] = useState(0);
  const [resumeFrom, setResumeFrom] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data2 = readM3(data.id);
    if (data2) {
      if (data2.completed) {
        setStep(CONCLUSION);
      } else if (data2.step > 0 && data2.step < CONCLUSION) {
        setResumeFrom(data2.step);
      }
    }
    setHydrated(true);
  }, [data.id, CONCLUSION]);

  useEffect(() => {
    if (!hydrated || resumeFrom !== null) return;
    writeM3(data.id, { step, completed: step === CONCLUSION });

    if (step === CONCLUSION) {
      const prefs = readMessengerPrefs();
      if (!prefs.includes(data.id)) {
        writeMessengerPrefs([...prefs, data.id]);
      }
    }
  }, [step, hydrated, resumeFrom, data.id, CONCLUSION]);

  function next() {
    setStep((s) => Math.min(s + 1, CONCLUSION));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function startOver() {
    clearM3(data.id);
    setStep(0);
    setResumeFrom(null);
  }
  function continueFrom(target: number) {
    setStep(target);
    setResumeFrom(null);
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="px-6 sm:px-10 py-4 border-b border-ink/10 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/hub"
            className="font-bold text-ink hover:text-accent transition-colors"
          >
            ← К обучению
          </Link>
          <button
            type="button"
            onClick={startOver}
            className="text-sm text-ink-soft hover:text-ink underline underline-offset-4 decoration-ink-soft/40"
          >
            Начать заново
          </button>
        </div>
      </header>

      <div className="px-6 sm:px-10 pt-6">
        <div className="max-w-3xl mx-auto">
          <ProgressBar current={step + 1} total={total} />
        </div>
      </div>

      <section className="px-6 sm:px-10 py-8 sm:py-10 flex-1">
        <div key={step} className="max-w-3xl mx-auto animate-fade-in">
          {step === INTRO && <Intro data={data} />}
          {step > INTRO && step < CONCLUSION && (
            <StepView
              brand={data.brand}
              step={data.steps[step - 1]}
              index={step}
              total={data.steps.length}
            />
          )}
          {step === CONCLUSION && <Conclusion data={data} />}
        </div>
      </section>

      {step < CONCLUSION && (
        <nav
          className="sticky bottom-0 px-6 sm:px-10 py-4 bg-white/95 backdrop-blur border-t border-ink/10"
          aria-label="Навигация по модулю"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <Button variant="secondary" onClick={back} disabled={step === 0}>
              Назад
            </Button>
            <Button variant="primary" onClick={next}>
              Дальше
            </Button>
          </div>
        </nav>
      )}

      {resumeFrom !== null && (
        <ResumeModal
          fromStep={resumeFrom}
          onContinue={() => continueFrom(resumeFrom)}
          onRestart={startOver}
        />
      )}
    </main>
  );
}

function Intro({ data }: { data: MessengerModule }) {
  return (
    <div>
      <div
        className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
        style={{ background: data.brand.accent, color: data.brand.primary }}
      >
        {data.brand.name}
      </div>
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{data.intro.title}</h2>
      <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-2xl">
        {data.intro.body}
      </p>
      <p className="mt-6 text-sm text-ink-soft">
        Всего шагов: <span className="font-semibold text-ink">{data.steps.length}</span>
      </p>
    </div>
  );
}

function StepView({
  brand,
  step,
  index,
  total,
}: {
  brand: MessengerModule["brand"];
  step: MessengerModule["steps"][number];
  index: number;
  total: number;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div>
        <p className="text-sm uppercase tracking-wide text-ink-soft">
          Шаг {index} из {total}
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold">{step.title}</h2>
        <p className="mt-4 text-lg leading-relaxed">{step.action}</p>
        {step.hint && (
          <div className="mt-5 p-4 bg-sand rounded-card border border-amber-100">
            <p className="text-base leading-relaxed">{step.hint}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center lg:justify-end">
        {step.screenshot ? (
          <PhoneFrame src={step.screenshot} alt={step.title} brand={brand} />
        ) : (
          <MessengerMockScreen brand={brand} mock={step.mock} />
        )}
      </div>
    </div>
  );
}

function PhoneFrame({
  src,
  alt,
  brand,
}: {
  src: string;
  alt: string;
  brand: MessengerModule["brand"];
}) {
  return (
    <div className="w-full max-w-[280px]">
      <div
        className="h-1 rounded-t-xl"
        style={{ background: brand.primary }}
      />
      <div className="rounded-b-2xl overflow-hidden shadow-xl border border-t-0 border-slate-200 bg-white">
        <Image
          src={src}
          alt={alt}
          width={480}
          height={960}
          className="w-full h-auto block"
          unoptimized
        />
      </div>
    </div>
  );
}

function Conclusion({ data }: { data: MessengerModule }) {
  const next = NEXT_HREF[data.id];
  const isLastBeforeMemo = data.id === "whatsapp";
  const conclusionEntry = module4.perMessenger[data.id];

  return (
    <div>
      <div className="inline-flex items-center gap-2 bg-success-soft text-success px-4 py-2 rounded-full font-semibold">
        <span aria-hidden="true">✓</span>
        Готово
      </div>
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{data.conclusion.title}</h2>
      <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-2xl">
        {data.conclusion.body}
      </p>

      <div className="mt-8 rounded-card p-5 sm:p-6 bg-sand border border-amber-100">
        <p className="text-sm uppercase tracking-wide text-ink-soft mb-3">
          В вашу памятку добавятся пункты:
        </p>
        <ul className="space-y-2">
          {conclusionEntry.checks.map((c) => (
            <li key={c.id} className="flex items-start gap-2">
              <span className="mt-1 text-success" aria-hidden="true">✓</span>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href={next} variant="primary">
          {isLastBeforeMemo ? "Открыть памятку" : "Следующий мессенджер"}
        </Button>
        <Button href="/hub" variant="secondary">
          К обучению
        </Button>
      </div>
    </div>
  );
}

function ResumeModal({
  fromStep,
  onContinue,
  onRestart,
}: {
  fromStep: number;
  onContinue: () => void;
  onRestart: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-center justify-center px-6 bg-ink/40"
    >
      <div className="bg-white rounded-card p-6 sm:p-8 max-w-md w-full shadow-xl animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold">
          Продолжить с шага {fromStep + 1}?
        </h2>
        <p className="mt-3 text-ink-soft">
          В прошлый раз вы остановились на этом блоке. Хотите продолжить или
          начать заново?
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button variant="primary" onClick={onContinue}>
            Продолжить
          </Button>
          <Button variant="secondary" onClick={onRestart}>
            Начать заново
          </Button>
        </div>
      </div>
    </div>
  );
}
