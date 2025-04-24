"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { module1 } from "@/lib/content";
import { clearProgress, readProgress, writeProgress } from "@/lib/progress";
import { ScreenIntro } from "./ScreenIntro";
import { ScreenThreats } from "./ScreenThreats";
import { ScreenMainRule } from "./ScreenMainRule";
import { ScreenQuiz } from "./ScreenQuiz";
import { ScreenSummary } from "./ScreenSummary";

const TOTAL = module1.totalSteps;
const QUIZ_INDEX = 3;

export function ModuleShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [resumeFrom, setResumeFrom] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const urlStep = searchParams.get("step");
    const parsed = urlStep !== null ? parseInt(urlStep, 10) : NaN;
    if (!isNaN(parsed) && parsed >= 0 && parsed < TOTAL) {
      setStep(parsed);
      if (parsed > QUIZ_INDEX) setQuizPassed(true);
      setHydrated(true);
      return;
    }

    const existing = readProgress();
    if (existing && existing.step > 0 && existing.step < TOTAL) {
      setResumeFrom(existing.step);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(step));
    router.replace(`?${params.toString()}`, { scroll: false });
    if (resumeFrom === null) {
      writeProgress(step);
    }
  }, [step, hydrated]);

  function goNext() {
    if (step === QUIZ_INDEX && !quizPassed) return;
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function continueFrom(target: number) {
    setStep(target);
    if (target > QUIZ_INDEX) {
      setQuizPassed(true);
    }
    setResumeFrom(null);
  }

  function startOver() {
    clearProgress();
    setStep(0);
    setQuizPassed(false);
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
          {step === 0 && <ScreenIntro />}
          {step === 1 && <ScreenThreats />}
          {step === 2 && <ScreenMainRule />}
          {step === 3 && <ScreenQuiz onResolved={() => setQuizPassed(true)} />}
          {step === 4 && <ScreenSummary />}
        </div>
      </section>

      {step < TOTAL - 1 && (
        <nav
          className="sticky bottom-0 px-6 sm:px-10 py-4 bg-white/95 backdrop-blur border-t border-ink/10"
          aria-label="Навигация по модулю"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={goBack}
              disabled={step === 0}
            >
              Назад
            </Button>
            <Button
              variant="primary"
              onClick={goNext}
              disabled={step === QUIZ_INDEX && !quizPassed}
            >
              Дальше
            </Button>
          </div>
          {step === QUIZ_INDEX && !quizPassed && (
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
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-ink/40"
    >
      <div className="bg-white rounded-card p-6 sm:p-8 max-w-md w-full shadow-xl animate-fade-in">
        <h2 id="resume-title" className="text-xl sm:text-2xl font-bold">
          Продолжить с шага {fromStep + 1}?
        </h2>
        <p className="mt-3 text-ink-soft">
          В прошлый раз вы остановились на шаге {fromStep + 1} из {TOTAL}.
          Хотите продолжить или начать заново?
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
