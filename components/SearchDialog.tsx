"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import {
  searchSite,
  tokenize,
  searchSuggestions,
  type SearchEntry,
} from "@/lib/search";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>;
  const pattern = tokens.map(escapeRegExp).join("|");
  const re = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(re);
  const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");
  const set = new Set(tokens);
  return (
    <>
      {parts.map((p, i) =>
        p && set.has(norm(p)) ? (
          <mark key={i} className="rounded-[3px] bg-amber-200/80 px-0.5 text-ink">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  const results = useMemo(() => searchSite(query), [query]);
  const tokens = useMemo(() => tokenize(query), [query]);
  const hasQuery = query.trim().length > 0;

  // Open/close hotkeys: ⌘K / Ctrl+K toggles, "/" opens when not typing.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (key === "/" && !open) {
        const el = document.activeElement as HTMLElement | null;
        const typing =
          !!el &&
          (el.tagName === "INPUT" ||
            el.tagName === "TEXTAREA" ||
            el.isContentEditable);
        if (!typing) {
          e.preventDefault();
          setOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Определяем платформу один раз после монтирования, чтобы показать
  // правильную подсказку: ⌘K на Mac, Ctrl K на Windows/Linux.
  useEffect(() => {
    const ua =
      typeof navigator !== "undefined"
        ? `${navigator.platform} ${navigator.userAgent}`
        : "";
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(ua));
  }, []);

  // Focus input + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    setActive(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Return focus to the trigger only when an open dialog is closed.
  useEffect(() => {
    if (prevOpen.current && !open) triggerRef.current?.focus();
    prevOpen.current = open;
  }, [open]);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Reset highlighted result as the query changes.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`search-opt-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function go(entry: SearchEntry) {
    setOpen(false);
    setQuery("");
    router.push(entry.href);
  }

  function onDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[active] ?? results[0];
      if (entry) go(entry);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Поиск по сайту"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex items-center gap-2 rounded-btn border border-ink/15 bg-white px-3 py-2 text-base font-medium text-ink-soft transition-colors hover:bg-slate-100 hover:text-ink"
      >
        <SearchIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Поиск</span>
        <kbd className="hidden items-center whitespace-nowrap rounded border border-ink/15 bg-slate-50 px-1.5 py-0.5 font-sans text-xs text-ink-soft md:inline-flex">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      {open &&
        createPortal(
        <div
          className="animate-fade-in fixed inset-0 z-[80] flex items-start justify-center bg-ink/40 px-4 pb-4 pt-[8vh] sm:pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Поиск по сайту"
            onKeyDown={onDialogKeyDown}
            className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-card border border-ink/10 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4 sm:px-5">
              <SearchIcon className="h-5 w-5 flex-shrink-0 text-ink-soft" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={
                  results.length ? `search-opt-${active}` : undefined
                }
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Поиск по сайту…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent py-4 text-lg outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-ink-soft/60"
              />
              {hasQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Очистить поле"
                  className="rounded p-1 text-ink-soft transition-colors hover:text-ink"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="overflow-y-auto">
              {!hasQuery ? (
                <div className="px-4 py-5 sm:px-5">
                  <p className="mb-3 text-sm font-medium text-ink-soft">
                    Популярные запросы
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setQuery(s);
                          inputRef.current?.focus();
                        }}
                        className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent/40 hover:bg-slate-100"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-base text-ink">
                    Ничего не нашлось по запросу «{query.trim()}».
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Попробуйте другие слова — например, «код», «пароль» или
                    «взлом».
                  </p>
                </div>
              ) : (
                <ul
                  id="search-results"
                  role="listbox"
                  aria-label="Результаты поиска"
                  className="py-2"
                >
                  {results.map((r, i) => (
                    <li
                      key={r.id}
                      id={`search-opt-${i}`}
                      role="option"
                      aria-selected={i === active}
                    >
                      <button
                        type="button"
                        onClick={() => go(r)}
                        onMouseMove={() => setActive(i)}
                        className={`flex w-full items-start gap-3 px-4 py-3 text-left sm:px-5 ${
                          i === active ? "bg-accent-soft/60" : ""
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-base font-semibold leading-snug text-ink">
                            <Highlight text={r.title} tokens={tokens} />
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink-soft">
                            <Highlight text={r.snippet} tokens={tokens} />
                          </p>
                        </div>
                        <span className="mt-0.5 flex-shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                          {r.category}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hidden items-center gap-4 border-t border-ink/10 px-5 py-2.5 text-xs text-ink-soft sm:flex">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-ink/15 bg-slate-50 px-1.5 py-0.5">
                  ↑
                </kbd>
                <kbd className="rounded border border-ink/15 bg-slate-50 px-1.5 py-0.5">
                  ↓
                </kbd>
                выбрать
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-ink/15 bg-slate-50 px-1.5 py-0.5">
                  ↵
                </kbd>
                открыть
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-ink/15 bg-slate-50 px-1.5 py-0.5">
                  esc
                </kbd>
                закрыть
              </span>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
