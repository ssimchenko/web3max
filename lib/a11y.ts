export type FontSize = "normal" | "large" | "xlarge";
export type Theme = "normal" | "contrast" | "dark" | "sepia";
export type Spacing = "normal" | "wide";
export type Links = "off" | "on";

export type A11ySettings = {
  font: FontSize;
  theme: Theme;
  spacing: Spacing;
  links: Links;
};

export const DEFAULT_A11Y: A11ySettings = {
  font: "normal",
  theme: "normal",
  spacing: "normal",
  links: "off",
};

export const A11Y_KEY = "web3max:a11y:settings";

export function readA11y(): A11ySettings {
  if (typeof window === "undefined") return DEFAULT_A11Y;
  try {
    const raw = window.localStorage.getItem(A11Y_KEY);
    if (!raw) return DEFAULT_A11Y;
    return { ...DEFAULT_A11Y, ...(JSON.parse(raw) as Partial<A11ySettings>) };
  } catch {
    return DEFAULT_A11Y;
  }
}

export function writeA11y(s: A11ySettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(A11Y_KEY, JSON.stringify(s));
  } catch {
    return;
  }
}

export function applyA11y(s: A11ySettings): void {
  if (typeof document === "undefined") return;
  const d = document.documentElement;
  d.setAttribute("data-a11y-font", s.font);
  d.setAttribute("data-a11y-theme", s.theme);
  d.setAttribute("data-a11y-spacing", s.spacing);
  d.setAttribute("data-a11y-links", s.links);
}
