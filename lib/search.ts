import { hub, module1, module2, module3, module4, faq } from "@/lib/content";

export type SearchEntry = {
  id: string;
  title: string;
  snippet: string;
  href: string;
  category: string;
  keywords: string;
};

function messengerKeywords(k: "max" | "telegram" | "whatsapp"): string {
  const m = module3[k];
  const steps = m.steps
    .map((s) => [s.title, s.action, s.hint].filter(Boolean).join(" "))
    .join(" ");
  return `${m.brand.name} ${m.intro.title} ${m.intro.body} ${steps} ${m.conclusion.title} ${m.conclusion.body}`;
}

const module1Keywords = [
  module1.steps.intro.title,
  ...module1.steps.intro.body,
  module1.steps.intro.simpleExplanation,
  module1.steps.threats.lead,
  module1.steps.threats.body,
  ...module1.steps.threats.steps.flatMap((s) => [s.heading, s.detail]),
  module1.steps["main-rule"].rule,
  module1.steps["main-rule"].body,
  module1.steps.quiz.situation,
  ...module1.steps.summary.bullets,
].join(" ");

const module2Keywords = [
  module2.intro.body,
  ...module2.scenarios.flatMap((s) => [s.title, s.intro, s.rightAction]),
].join(" ");

const module4Keywords = [
  module4.intro,
  ...module4.generalChecks.map((c) => c.label),
  module4.emergency.title,
  ...module4.emergency.bullets,
].join(" ");

const keywordsById: Record<string, string> = {
  m1: module1Keywords,
  m2: module2Keywords,
  "m3:max": messengerKeywords("max"),
  "m3:telegram": messengerKeywords("telegram"),
  "m3:whatsapp": messengerKeywords("whatsapp"),
  m4: module4Keywords,
};

const hubEntries: SearchEntry[] = hub.groups.flatMap((g) =>
  g.modules.map((m) => ({
    id: m.id,
    title: m.title,
    snippet: m.description,
    href: m.href,
    category: g.title,
    keywords: keywordsById[m.id] ?? "",
  })),
);

const scenarioEntries: SearchEntry[] = module2.scenarios.map((s) => ({
  id: `scenario-${s.id}`,
  title: s.title,
  snippet: s.intro,
  href: "/module-2",
  category: "Обучение",
  keywords: `${s.rightAction} ${s.message.text}`,
}));

const extraEntries: SearchEntry[] = [
  {
    id: "main-rule",
    title: "Главное правило безопасности",
    snippet: module1.steps["main-rule"].rule,
    href: "/module-1",
    category: "Обучение",
    keywords: `${module1.steps["main-rule"].body} код пароль не сообщать смс`,
  },
  {
    id: "emergency",
    title: module4.emergency.title,
    snippet: module4.emergency.bullets[0],
    href: "/module-4",
    category: "Памятка",
    keywords: `${module4.emergency.bullets.join(" ")} взлом украли доступ`,
  },
];

const faqEntries: SearchEntry[] = faq.items.map((item, i) => ({
  id: `faq-${i}`,
  title: item.q,
  snippet: item.a,
  href: `/faq#faq-${i}`,
  category: "Вопросы",
  keywords: "",
}));

const entries: SearchEntry[] = [
  ...hubEntries,
  ...scenarioEntries,
  ...extraEntries,
  ...faqEntries,
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/ё/g, "е");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type Indexed = SearchEntry & { _title: string; _hay: string };

const indexed: Indexed[] = entries.map((e) => ({
  ...e,
  _title: normalize(e.title),
  _hay: normalize(`${e.title} ${e.snippet} ${e.keywords}`),
}));

export function tokenize(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export function searchSite(query: string, limit = 12): SearchEntry[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const scored: { entry: Indexed; score: number }[] = [];

  for (const entry of indexed) {
    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      if (!entry._hay.includes(token)) {
        matchedAll = false;
        break;
      }
      score += entry._title.includes(token) ? 10 : 3;
      const atWordStart = new RegExp(`(^|[^a-zа-я0-9])${escapeRegExp(token)}`, "i");
      if (atWordStart.test(entry._hay)) score += 2;
      if (entry._title.startsWith(token)) score += 4;
    }

    if (!matchedAll) continue;

    const phrase = tokens.join(" ");
    if (entry._title === phrase) score += 50;
    else if (entry._title.startsWith(phrase)) score += 8;

    scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => ({
    id: entry.id,
    title: entry.title,
    snippet: entry.snippet,
    href: entry.href,
    category: entry.category,
    keywords: entry.keywords,
  }));
}

export const searchSuggestions = [
  "пришёл код",
  "облачный пароль",
  "взломали аккаунт",
  "двухэтапная защита",
  "подозрительная ссылка",
];
