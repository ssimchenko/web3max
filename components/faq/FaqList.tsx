"use client";

import { useEffect } from "react";
import { faq } from "@/lib/content";

export function FaqList() {
  useEffect(() => {
    function openFromHash() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
      {faq.items.map((item, i) => (
        <details
          key={i}
          id={`faq-${i}`}
          className="group scroll-mt-24 py-4 [&_summary::-webkit-details-marker]:hidden"
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
  );
}
