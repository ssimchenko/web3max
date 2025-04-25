"use client";

import { useState } from "react";

export function SimpleExplanation({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-accent text-base underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
      >
        {open ? "Свернуть объяснение" : "Я не понял, объясните проще"}
      </button>
      {open && (
        <div className="mt-3 p-4 bg-sand rounded-card border border-amber-100 animate-fade-in">
          <p className="text-base leading-relaxed">{text}</p>
        </div>
      )}
    </div>
  );
}
