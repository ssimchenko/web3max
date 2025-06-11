import type { ReactNode } from "react";

// Плоские inline-иконки одного стиля. Цвет наследуется через currentColor —
// задавайте его на родителе классом text-accent / text-danger / text-success.
// Все иконки декоративные: смысл несёт текст рядом.

export type IconName =
  | "clock"
  | "ruble"
  | "speech"
  | "eye"
  | "megaphone"
  | "money"
  | "link"
  | "lock"
  | "unlock"
  | "sms"
  | "chat-ghost"
  | "key"
  | "device"
  | "trash"
  | "spam"
  | "book"
  | "magnifier"
  | "phone-gear"
  | "bookmark"
  | "shield";

const paths: Record<IconName, ReactNode> = {
  clock: (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 15v9l7 4" />
    </>
  ),
  ruble: (
    <>
      <path d="M19 35V13h7a7 7 0 0 1 0 14h-7" />
      <path d="M13 30h18" />
    </>
  ),
  speech: (
    <>
      <path d="M14 12h20a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H24l-8 6v-6h-2a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6Z" />
      <path d="M16 20h16" strokeWidth="2.5" />
      <path d="M16 25h11" strokeWidth="2.5" />
    </>
  ),
  eye: (
    <>
      <path d="M8 24c6-9 26-9 32 0-6 9-26 9-32 0Z" />
      <circle cx="24" cy="24" r="5" />
    </>
  ),
  megaphone: (
    <>
      <path d="M12 21h8l14-8v22l-14-8h-8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" />
      <path d="M16 27v6a2 2 0 0 0 4 0v-3" />
      <path d="M38 19a7 7 0 0 1 0 10" strokeWidth="2.5" />
    </>
  ),
  money: (
    <>
      <rect x="7" y="15" width="34" height="18" rx="3" />
      <circle cx="24" cy="24" r="4.5" />
      <circle cx="13" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="35" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  link: (
    <>
      <path d="M27 21l4-4a6 6 0 0 1 9 9l-4 4a6 6 0 0 1-9-1" />
      <path d="M21 27l-4 4a6 6 0 0 1-9-9l4-4a6 6 0 0 1 9 1" />
    </>
  ),
  lock: (
    <>
      <path d="M17 22v-4a7 7 0 0 1 14 0v4" />
      <rect x="13" y="22" width="22" height="16" rx="3" />
      <path d="M24 29v3" />
    </>
  ),
  unlock: (
    <>
      <path d="M17 22v-4a7 7 0 0 1 13-3" />
      <rect x="13" y="22" width="22" height="16" rx="3" />
      <path d="M24 29v3" />
    </>
  ),
  sms: (
    <>
      <rect x="8" y="13" width="32" height="22" rx="3" />
      <path d="M9 16l15 11 15-11" />
    </>
  ),
  "chat-ghost": (
    <>
      <path d="M14 12h20a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H24l-8 6v-6h-2a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6Z" />
      <path d="M20 19l8 8M28 19l-8 8" strokeWidth="2.5" />
    </>
  ),
  key: (
    <>
      <circle cx="17" cy="17" r="7" />
      <path d="M22 22l14 14" />
      <path d="M30 34l3-3M27 31l3-3" strokeWidth="2.5" />
    </>
  ),
  device: (
    <>
      <rect x="12" y="11" width="24" height="17" rx="2" />
      <path d="M8 33h32l-3-5H11l-3 5Z" />
    </>
  ),
  trash: (
    <>
      <path d="M14 16h20" />
      <path d="M20 16v-3h8v3" />
      <path d="M16 16l2 20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-20" />
      <path d="M21 21v12M27 21v12" strokeWidth="2.5" />
    </>
  ),
  spam: (
    <>
      <path d="M24 10l16 27a2 2 0 0 1-2 3H10a2 2 0 0 1-2-3l16-27a2 2 0 0 1 0 0Z" />
      <path d="M24 20v8" />
      <circle cx="24" cy="33" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),
  book: (
    <>
      <path d="M24 14c-4-3-12-3-16-1v22c4-2 12-2 16 1 4-3 12-3 16-1V13c-4-2-12-2-16 1Z" />
      <path d="M24 14v23" />
    </>
  ),
  magnifier: (
    <>
      <circle cx="21" cy="21" r="11" />
      <path d="M29 29l9 9" />
    </>
  ),
  "phone-gear": (
    <>
      <rect x="11" y="8" width="17" height="32" rx="4" />
      <path d="M11 14h17M11 34h17" strokeWidth="2.5" />
      <circle cx="33" cy="33" r="5" />
      <path d="M33 26v2M33 38v2M40 33h-2M28 33h-2M38 38l-1.4-1.4M28 28l1.4 1.4M38 28l-1.4 1.4M28 38l1.4-1.4" strokeWidth="2" />
    </>
  ),
  bookmark: (
    <>
      <path d="M15 10h18a2 2 0 0 1 2 2v27l-11-7-11 7V12a2 2 0 0 1 2-2Z" />
      <path d="M19 20l4 4 7-8" strokeWidth="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M24 6l16 6v12c0 9-7 16-16 20-9-4-16-11-16-20V12l16-6Z" />
      <path d="M16 24l6 6 11-12" />
    </>
  ),
};

export function Icon({
  name,
  className = "w-6 h-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

// Крупная иллюстрация-щит для секции «Главное правило».
// Использует currentColor, поэтому подстраивается под цвет текста секции.
export function ShieldIllustration({
  className = "w-44 h-44",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="100" cy="100" r="92" fill="currentColor" opacity="0.12" />
      <path
        d="M100 30l54 20v40c0 31-23 54-54 66-31-12-54-35-54-66V50l54-20Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M100 30l54 20v40c0 31-23 54-54 66-31-12-54-35-54-66V50l54-20Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M74 100l18 18 34-38"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
