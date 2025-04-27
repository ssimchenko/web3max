"use client";

import { useState } from "react";
import { ChatMockup } from "@/components/module/ChatMockup";
import { CallMockup } from "./CallMockup";
import type { ScamScenario } from "@/lib/content";

type Option = ScamScenario["options"][number];

export function ScenarioScreen({
  scenario,
  initialPick,
  onPick,
  onResolved,
}: {
  scenario: ScamScenario;
  initialPick?: string;
  onPick: (optionId: string) => void;
  onResolved: () => void;
}) {
  const [picked, setPicked] = useState<Option | null>(() => {
    if (!initialPick) return null;
    return scenario.options.find((o) => o.id === initialPick) ?? null;
  });

  function choose(option: Option) {
    setPicked(option);
    onPick(option.id);
    if (option.correct) onResolved();
  }

  function tryAgain() {
    setPicked(null);
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold">{scenario.title}</h2>
      <p className="mt-4 text-lg text-ink-soft leading-relaxed">{scenario.intro}</p>

      <div className="mt-6">
        {scenario.message.channel === "call" ? (
          <CallMockup from={scenario.message.from} text={scenario.message.text} />
        ) : (
          <ChatMockup from={scenario.message.from} text={scenario.message.text} />
        )}
      </div>

      {!picked && (
        <fieldset className="mt-8">
          <legend className="text-base font-medium mb-3">Что вы сделаете?</legend>
          <div className="grid gap-3">
            {scenario.options.map((opt) => (
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
          {picked.correct && (
            <p className="mt-5 text-sm">
              <span className="font-semibold text-ink">Правильное действие: </span>
              <span>{scenario.rightAction}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
