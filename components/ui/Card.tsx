import type { ReactNode } from "react";

export function Card({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "sand" | "accent" | "success" | "danger";
}) {
  const tones: Record<string, string> = {
    default: "bg-white border border-ink/10",
    sand: "bg-sand border border-amber-100",
    accent: "bg-accent-soft border border-accent/20",
    success: "bg-success-soft border border-success/30",
    danger: "bg-danger-soft border border-danger/30",
  };
  return (
    <div className={`rounded-card p-5 sm:p-6 ${tones[tone]}`}>{children}</div>
  );
}
