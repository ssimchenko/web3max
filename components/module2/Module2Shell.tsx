"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { module2 } from "@/lib/content";
import { clearM2, readM2, writeM2 } from "@/lib/progress";
import { ScenarioScreen } from "./ScenarioScreen";

const TOTAL = module2.scenarios.length + 2;
const INTRO = 0;
const FIRST_SCENARIO = 1;
const SUMMARY = TOTAL - 1;

export function Module2Shell() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [solved, setSolved] = useState<Record<number, boolean>>({});
  const [resumeFrom, setResumeFrom] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data = readM2();
    if (data) {
      setPicks(data.picks ?? {});
      if (data.completed) {
        setStep(SUMMARY);
        const allSolved: Record<number, boolean> = {};
        module2.scenarios.forEach((_, i) => {
          allSolved[FIRST_SCENARIO + i] = true;
        });
        setSolved(allSolved);
      } else if (data.step > 0 && data.step < SUMMARY) {
        setResumeFrom(data.step);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || resumeFrom !== null) return;
    writeM2({ step, picks, completed: step === SUMMARY });
  }, [step, picks, hydrated, resumeFrom]);

  function isScenarioStep(s: number) {
    return s >= FIRST_SCENARIO && s < SUMMARY;
  }

  function currentScenario() {
    return module2.scenarios[step - FIRST_SCENARIO];
  }

  function recordPick(optionId: string) {
    const sc = currentScenario();
    if (!sc) return;
    setPicks((p) => ({ ...p, [sc.id]: optionId }));
  }

  function resolveScenario() {
    setSolved((s) => ({ ...s, [step]: true }));
  }

  function next() {
    if (isScenarioStep(step) && !solved[step]) return;
    setStep((s) => Math.min(s + 1, SUMMARY));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function startOver() {
    clearM2();
    setStep(0);
    setPicks({});
    setSolved({});
    setResumeFrom(null);
  }

  function continueFrom(target: number) {
    setStep(target);
    const seeded: Record<number, boolean> = {};
    for (let i = FIRST_SCENARIO; i < target; i++) {
      seeded[i] = true;
    }
    setSolved(seeded);
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
          <ProgressBar current={step + 1} total={TOTAL} />
        </div>
      </div>

      <section className="px-6 sm:px-10 py-8 sm:py-10 flex-1">
        <div key={step} className="max-w-3xl mx-auto animate-fade-in">
          {step === INTRO && <IntroScreen />}
          {isScenarioStep(step) && (
            <ScenarioScreen
              key={currentScenario()?.id}
              scenario={currentScenario()!}
              initialPick={picks[currentScenario()!.id]}
              onPick={recordPick}
              onResolved={resolveScenario}
            />
          )}
          {step === SUMMARY && <SummaryScreen />}
        </div>
      </section>

      {step < SUMMARY && (
        <nav
          className="sticky bottom-0 px-6 sm:px-10 py-4 bg-white/95 backdrop-blur border-t border-ink/10"
          aria-label="Навигация по модулю"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <Button variant="secondary" onClick={back} disabled={step === 0}>
              Назад
            </Button>
            <Button
              variant="primary"
              onClick={next}
              disabled={isScenarioStep(step) && !solved[step]}
            >
              Дальше
            </Button>
          </div>
          {isScenarioStep(step) && !solved[step] && (
            <p className="max-w-3xl mx-auto mt-2 text-sm text-ink-soft text-center">
              Выберите безопасный вариант, чтобы перейти дальше.
            </p>
          )}
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

function IntroScreen() {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold">{module2.intro.title}</h2>
      <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-2xl">
        {module2.intro.body}
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {module2.scenarios.map((s, i) => (
          <li
            key={s.id}
            className="flex items-start gap-3 bg-sand rounded-card p-4 border border-amber-100"
          >
            <span
              className="mt-0.5 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="font-medium">{s.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SummaryScreen() {
  const s = module2.summary;
  return (
    <div>
      <div className="inline-flex items-center gap-2 bg-success-soft text-success px-4 py-2 rounded-full font-semibold">
        <span aria-hidden="true">✓</span>
        Блок пройден
      </div>
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{s.title}</h2>
      <p className="mt-4 text-lg">{s.lead}</p>

      <div className="mt-6 rounded-card bg-accent text-white p-6 sm:p-8">
        <p className="text-xl sm:text-2xl font-bold leading-snug">{s.rule}</p>
      </div>

      <p className="mt-8 text-lg text-ink-soft">{s.next}</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href={s.nextHref} variant="primary">
          {s.nextLabel}
        </Button>
        <Button href="/hub" variant="secondary">
          {s.home}
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
      aria-labelledby="m2-resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-ink/40"
    >
      <div className="bg-white rounded-card p-6 sm:p-8 max-w-md w-full shadow-xl animate-fade-in">
        <h2 id="m2-resume-title" className="text-xl sm:text-2xl font-bold">
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
