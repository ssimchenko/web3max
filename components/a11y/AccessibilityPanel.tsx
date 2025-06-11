"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_A11Y,
  applyA11y,
  readA11y,
  writeA11y,
  type A11ySettings,
  type FontSize,
  type Spacing,
  type Theme,
} from "@/lib/a11y";

const FONT_OPTIONS: { value: FontSize; label: string; aria: string }[] = [
  { value: "normal", label: "А", aria: "Обычный размер шрифта" },
  { value: "large", label: "А+", aria: "Крупный шрифт" },
  { value: "xlarge", label: "А++", aria: "Очень крупный шрифт" },
];

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "normal", label: "Обычная" },
  { value: "contrast", label: "Высокий контраст" },
  { value: "dark", label: "Белым по чёрному" },
  { value: "sepia", label: "Бежевый фон" },
];

const SPACING_OPTIONS: { value: Spacing; label: string }[] = [
  { value: "normal", label: "Обычный" },
  { value: "wide", label: "Увеличенный" },
];

const FONT_SAY: Record<FontSize, string> = {
  normal: "обычный",
  large: "крупный",
  xlarge: "очень крупный",
};
const THEME_SAY: Record<Theme, string> = {
  normal: "обычная",
  contrast: "высокий контраст",
  dark: "белым по чёрному",
  sepia: "мягкий бежевый фон",
};
const SPACING_SAY: Record<Spacing, string> = {
  normal: "обычный",
  wide: "увеличенный",
};

export function AccessibilityPanel() {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_A11Y);
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [ttsSupported, setTtsSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const keepAliveRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const s = readA11y();
    setSettings(s);
    applyA11y(s);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setTtsSupported(true);
      // На части браузеров (Chrome, iOS Safari) список голосов подгружается
      // асинхронно — прогреваем его, чтобы к моменту нажатия был русский голос.
      const synth = window.speechSynthesis;
      synth.getVoices();
      synth.addEventListener("voiceschanged", () => synth.getVoices());
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      stopKeepAlive();
    };
  }, []);

  // Останавливаем озвучивание при переходе на другую страницу.
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopKeepAlive();
    setSpeaking(false);
  }, [pathname]);

  function close() {
    setOpen(false);
    fabRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.focus();

    // Блокируем прокрутку страницы под открытой панелью (важно на телефоне).
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && panel) {
        const focusable = panel.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function apply(next: A11ySettings, message: string) {
    setSettings(next);
    writeA11y(next);
    applyA11y(next);
    setAnnouncement(message);
  }

  function reset() {
    apply(DEFAULT_A11Y, "Настройки доступности сброшены");
  }

  function stopKeepAlive() {
    if (keepAliveRef.current !== null) {
      window.clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }

  function startKeepAlive() {
    stopKeepAlive();
    // Chrome обрывает длинную озвучку примерно через 15 секунд —
    // периодический resume() удерживает её активной.
    keepAliveRef.current = window.setInterval(() => {
      const synth = window.speechSynthesis;
      if (synth.speaking) synth.resume();
      else stopKeepAlive();
    }, 8000);
  }

  function toggleSpeak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      stopKeepAlive();
      setSpeaking(false);
      setAnnouncement("Озвучивание остановлено");
      return;
    }
    const main = document.querySelector("main") as HTMLElement | null;
    const text = (main?.innerText || document.body.innerText || "").trim();
    if (!text) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru-RU";
    utter.rate = 0.95;
    const ruVoice = synth
      .getVoices()
      .find((v) => v.lang?.toLowerCase().startsWith("ru"));
    if (ruVoice) utter.voice = ruVoice;
    utter.onend = () => {
      stopKeepAlive();
      setSpeaking(false);
    };
    utter.onerror = () => {
      stopKeepAlive();
      setSpeaking(false);
    };
    setSpeaking(true);
    setAnnouncement("Озвучивание страницы началось");
    synth.speak(utter);
    startKeepAlive();
  }

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      <button
        ref={fabRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Настройки доступности для слабовидящих и незрячих"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex items-center justify-center w-12 h-16 rounded-l-card bg-accent text-white shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[65] bg-ink/30"
            onClick={close}
            aria-hidden="true"
          />
          <div
            id="a11y-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-panel-title"
            tabIndex={-1}
            className="fixed right-0 top-0 z-[70] h-full w-[min(23rem,100vw)] overflow-y-auto bg-white shadow-2xl outline-none flex flex-col gap-6 p-5 sm:p-6 pb-12 animate-fade-in"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="a11y-panel-title" className="text-xl font-bold text-ink">
                  Настройки доступности
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Настройте сайт под себя. Параметры сохранятся на этом устройстве.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть настройки доступности"
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-btn text-ink-soft hover:bg-slate-100 hover:text-ink transition-colors text-2xl leading-none"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="rounded-card border border-ink/15 bg-slate-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Предпросмотр
              </p>
              <div className="a11y-content">
                <p className="text-ink leading-relaxed">
                  Так будет выглядеть текст на сайте.{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-accent underline underline-offset-4"
                  >
                    Пример ссылки
                  </a>{" "}
                  внутри предложения.
                </p>
              </div>
            </div>

            <OptionGroup
              label="Размер шрифта"
              name="a11y-font"
              value={settings.font}
              options={FONT_OPTIONS}
              onChange={(v) =>
                apply({ ...settings, font: v }, `Размер шрифта: ${FONT_SAY[v]}`)
              }
            />

            <OptionGroup
              label="Цветовая схема"
              name="a11y-theme"
              value={settings.theme}
              options={THEME_OPTIONS}
              onChange={(v) =>
                apply({ ...settings, theme: v }, `Цветовая схема: ${THEME_SAY[v]}`)
              }
            />

            <OptionGroup
              label="Интервал между буквами и строками"
              name="a11y-spacing"
              value={settings.spacing}
              options={SPACING_OPTIONS}
              onChange={(v) =>
                apply({ ...settings, spacing: v }, `Интервал: ${SPACING_SAY[v]}`)
              }
            />

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="text-base font-medium text-ink">Подсветка ссылок</span>
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={settings.links === "on"}
                  onChange={(e) =>
                    apply(
                      { ...settings, links: e.target.checked ? "on" : "off" },
                      `Подсветка ссылок ${e.target.checked ? "включена" : "выключена"}`,
                    )
                  }
                  className="sr-only peer"
                />
                <span className="block h-7 w-12 rounded-full bg-slate-300 peer-checked:bg-accent peer-focus-visible:ring-4 peer-focus-visible:ring-accent/40 transition-colors" />
                <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
              </span>
            </label>

            {ttsSupported && (
              <div>
                <button
                  type="button"
                  onClick={toggleSpeak}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-btn border border-ink/20 bg-white px-4 py-3 text-base font-semibold text-ink hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  <span aria-hidden="true">{speaking ? "⏹" : "▶"}</span>
                  {speaking ? "Остановить озвучивание" : "Озвучить страницу"}
                </button>
                <p className="mt-2 text-sm text-ink-soft">
                  Прочитает вслух текст этой страницы.
                </p>
              </div>
            )}

            <div className="mt-auto pt-2 border-t border-ink/10">
              <button
                type="button"
                onClick={reset}
                className="text-base font-medium text-accent underline underline-offset-4 hover:text-blue-700"
              >
                Сбросить настройки
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function OptionGroup<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string; aria?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="m-0 p-0 border-0">
      <legend className="mb-2 text-sm font-semibold text-ink-soft">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = o.value === value;
          return (
            <label
              key={o.value}
              className={`cursor-pointer select-none rounded-btn border px-3.5 py-2 text-base font-medium transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/40 ${
                checked
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-ink border-ink/20 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                aria-label={o.aria}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
