"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { hub } from "@/lib/content";
import { getAllStatuses } from "@/lib/progress";

type Status = "done" | "in-progress" | "not-started";

const KEY_MAP: Record<string, keyof ReturnType<typeof getAllStatuses>> = {
  m1: "m1",
  m2: "m2",
  "m3:max": "m3:max",
  "m3:telegram": "m3:telegram",
  "m3:whatsapp": "m3:whatsapp",
};

export function HubView() {
  const [statuses, setStatuses] = useState<ReturnType<typeof getAllStatuses> | null>(null);

  useEffect(() => {
    setStatuses(getAllStatuses());
  }, []);

  function statusFor(id: string): Status {
    if (id === "m4") {
      if (!statuses) return "not-started";
      const everyDone =
        statuses.m1?.completed &&
        statuses.m2?.completed &&
        (statuses["m3:max"]?.completed ||
          statuses["m3:telegram"]?.completed ||
          statuses["m3:whatsapp"]?.completed);
      return everyDone ? "in-progress" : "not-started";
    }
    const key = KEY_MAP[id];
    const s = statuses?.[key];
    if (!s) return "not-started";
    if (s.completed) return "done";
    if (s.step > 0) return "in-progress";
    return "not-started";
  }

  let stepCounter = 0;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
      <section className="px-6 sm:px-10 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">{hub.title}</h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl">{hub.subtitle}</p>

          {hub.groups.map((group) => (
            <div key={group.title} className="mt-12">
              <h2 className="text-base font-semibold text-ink-soft uppercase tracking-widest border-b border-ink/10 pb-3">
                {group.title}
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {group.modules.map((m) => {
                  stepCounter += 1;
                  const step = stepCounter;
                  return (
                    <ModuleCard
                      key={m.id}
                      href={m.href}
                      step={step}
                      title={m.title}
                      duration={m.duration}
                      description={m.description}
                      status={statusFor(m.id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}

function ModuleCard({
  href,
  step,
  title,
  duration,
  description,
  status,
}: {
  href: string;
  step: number;
  title: string;
  duration: string;
  description: string;
  status: Status;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-card p-5 sm:p-6 border border-ink/10 bg-white hover:border-accent hover:shadow-sm transition-all"
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base font-bold ${
          status === "done"
            ? "bg-success-soft text-success"
            : status === "in-progress"
              ? "bg-accent-soft text-accent"
              : "bg-slate-100 text-ink-soft"
        }`}
      >
        {status === "done" ? "✓" : step}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="mt-2 text-base text-ink-soft leading-relaxed">{description}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-ink-soft">{duration}</span>
          <span className="text-accent font-medium group-hover:translate-x-0.5 transition-transform">
            {status === "in-progress"
              ? "Продолжить →"
              : status === "done"
                ? "Пройти ещё раз →"
                : "Перейти →"}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 bg-success-soft text-success px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
        <span aria-hidden="true">✓</span> Готово
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1 bg-accent-soft text-accent px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
        В процессе
      </span>
    );
  }
  return null;
}
