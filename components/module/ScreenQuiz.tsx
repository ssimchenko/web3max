"use client";

import { useState } from "react";
import { module1 } from "@/lib/content";
import { ChatMockup } from "./ChatMockup";
import { SimpleExplanation } from "./SimpleExplanation";

type Option = (typeof module1.steps.quiz.options)[number];

export function ScreenQuiz({ onResolved }: { onResolved: () => void }) {
  const s = module1.steps.quiz;
  const [picked, setPicked] = useState<Option | null>(null);

  function choose(option: Option) {
    setPicked(option);
    if (option.correct) {
      onResolved();
    }
  }

  function tryAgain() {
    setPicked(null);
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold">{s.title}</h2>
      <p className="mt-4 text-lg text-ink-soft">{s.situation}</p>

      <div className="mt-6">
        <ChatMockup from={s.message.from} text={s.message.text} />
      </div>

      {!picked && (
        <fieldset className="mt-8">
          <legend className="text-base font-medium mb-3">Ваш ответ:</legend>
          <div className="grid gap-3">
            {s.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => choose(opt)}
                className="text-left rounded-btn px-5 py-4 border-2 border-ink/15 hover:border-accent hover:bg-accent-soft transition-colors text-lg font-medium"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {picked && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-8 rounded-card p-5 sm:p-6 border-2 animate-fade-in ${
            picked.correct
              ? "bg-success-soft border-success/40"
              : "bg-danger-soft border-danger/40"
          }`}
        >
          <p
            className={`font-semibold text-lg ${
              picked.correct ? "text-success" : "text-danger"
            }`}
          >
            {picked.correct ? "Правильно" : "Так делать не стоит"}
          </p>
          <p className="mt-3 text-base leading-relaxed">{picked.feedback}</p>
          {!picked.correct && (
            <button
              type="button"
              onClick={tryAgain}
              className="mt-5 text-accent font-medium underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              Попробовать ещё раз
            </button>
          )}
        </div>
      )}

      <SimpleExplanation text={s.simpleExplanation} />
    </div>
  );
}
