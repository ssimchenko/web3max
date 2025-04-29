"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SiteHeader } from "@/components/SiteHeader";
import { module4 } from "@/lib/content";
import {
  type MessengerId,
  readM4Checks,
  readMessengerPrefs,
  writeM4Checks,
  writeMessengerPrefs,
} from "@/lib/progress";

const ALL_MESSENGERS: MessengerId[] = ["max", "telegram", "whatsapp"];

export function Module4View() {
  const [hydrated, setHydrated] = useState(false);
  const [prefs, setPrefs] = useState<MessengerId[]>([]);
  const [showPrefsForm, setShowPrefsForm] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const p = readMessengerPrefs();
    setPrefs(p);
    setShowPrefsForm(p.length === 0);
    setChecks(readM4Checks());
    setHydrated(true);
  }, []);

  function toggleCheck(id: string) {
    setChecks((c) => {
      const updated = { ...c, [id]: !c[id] };
      writeM4Checks(updated);
      return updated;
    });
  }

  function savePrefs(selected: MessengerId[]) {
    writeMessengerPrefs(selected);
    setPrefs(selected);
    setShowPrefsForm(false);
  }

  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>
      <main className="min-h-screen bg-white">
        <div className="px-6 sm:px-10 pt-4 print:hidden">
          <div className="max-w-3xl mx-auto flex justify-end">
            <button
              type="button"
              onClick={() => setShowPrefsForm(true)}
              className="text-sm text-ink-soft hover:text-ink underline underline-offset-4 decoration-ink-soft/40"
            >
              Изменить мессенджеры
            </button>
          </div>
        </div>

        {hydrated && showPrefsForm ? (
          <PrefsForm initial={prefs} onSave={savePrefs} />
        ) : (
          <Memo prefs={prefs} checks={checks} onToggle={toggleCheck} />
        )}
      </main>
    </>
  );
}

function PrefsForm({
  initial,
  onSave,
}: {
  initial: MessengerId[];
  onSave: (s: MessengerId[]) => void;
}) {
  const [selected, setSelected] = useState<Set<MessengerId>>(new Set(initial));

  function toggle(id: MessengerId) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="px-6 sm:px-10 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {module4.noMessengers.title}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{module4.noMessengers.body}</p>

        <fieldset className="mt-8">
          <legend className="sr-only">Мессенджеры</legend>
          <div className="grid gap-3">
            {module4.noMessengers.options.map((opt) => {
              const id = opt.id as MessengerId;
              const isOn = selected.has(id);
              return (
                <label
                  key={id}
                  className={`flex items-center gap-3 px-5 py-4 rounded-btn border-2 cursor-pointer transition-colors ${
                    isOn
                      ? "border-accent bg-accent-soft"
                      : "border-ink/15 hover:border-accent/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggle(id)}
                    className="w-5 h-5 accent-accent"
                  />
                  <span className="text-lg font-medium">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8">
          <Button
            variant="primary"
            onClick={() => onSave(Array.from(selected))}
            disabled={selected.size === 0}
          >
            {module4.noMessengers.save}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Memo({
  prefs,
  checks,
  onToggle,
}: {
  prefs: MessengerId[];
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const allMessengers = prefs.length > 0 ? prefs : ALL_MESSENGERS;

  return (
    <section className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold">{module4.title}</h1>
        <p className="mt-4 text-lg text-ink-soft">{module4.intro}</p>

        <Section title="Главное">
          <CheckList items={module4.generalChecks} checks={checks} onToggle={onToggle} />
        </Section>

        {allMessengers.map((id) => {
          const block = module4.perMessenger[id];
          return (
            <Section key={id} title={block.title}>
              <CheckList items={block.checks} checks={checks} onToggle={onToggle} />
            </Section>
          );
        })}

        <Section title={module4.emergency.title} tone="danger">
          <ul className="space-y-3">
            {module4.emergency.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 w-7 h-7 rounded-full bg-danger text-white flex items-center justify-center text-sm font-bold flex-shrink-0"
                >
                  {i + 1}
                </span>
                <span className="text-base leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 print:hidden">
          <Button href="/hub" variant="primary">
            К обучению
          </Button>
          <Button href="/faq" variant="secondary">
            Вопросы и ответы
          </Button>
        </div>
      </div>
    </section>
  );
}

function Section({
  title,
  tone = "default",
  children,
}: {
  title: string;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  const wrap =
    tone === "danger"
      ? "mt-10 rounded-card p-5 sm:p-6 bg-danger-soft border border-danger/30"
      : "mt-10 rounded-card p-5 sm:p-6 bg-sand border border-amber-100";
  return (
    <div className={wrap}>
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CheckList({
  items,
  checks,
  onToggle,
}: {
  items: ReadonlyArray<{ id: string; label: string }>;
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {items.map((it) => {
        const on = !!checks[it.id];
        return (
          <li key={it.id}>
            <label className="flex items-start gap-3 px-3 py-3 rounded-btn cursor-pointer hover:bg-white/60 transition-colors">
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle(it.id)}
                className="mt-1 w-5 h-5 accent-accent"
              />
              <span
                className={`text-base leading-snug ${
                  on ? "line-through text-ink-soft" : ""
                }`}
              >
                {it.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
