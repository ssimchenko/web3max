const KEY = {
  m1: "web3max:progress:module-1",
  m2: "web3max:progress:module-2",
  m3: (id: MessengerId) => `web3max:progress:module-3:${id}`,
  m4checks: "web3max:progress:module-4:checks",
  prefsMessengers: "web3max:prefs:messengers",
} as const;

export type MessengerId = "max" | "telegram" | "whatsapp";

export type ModuleProgress = {
  step: number;
  updatedAt: number;
};

export type Module2Progress = {
  step: number;
  picks: Record<string, string>;
  completed: boolean;
  updatedAt: number;
};

export type Module3Progress = {
  step: number;
  completed: boolean;
  updatedAt: number;
};

function safeRead<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    return;
  }
}

export function readProgress(): ModuleProgress | null {
  return safeRead<ModuleProgress>(KEY.m1);
}

export function writeProgress(step: number): void {
  safeWrite(KEY.m1, { step, updatedAt: Date.now() });
}

export function clearProgress(): void {
  safeRemove(KEY.m1);
}

export function readM2(): Module2Progress | null {
  return safeRead<Module2Progress>(KEY.m2);
}

export function writeM2(data: Omit<Module2Progress, "updatedAt">): void {
  safeWrite(KEY.m2, { ...data, updatedAt: Date.now() });
}

export function clearM2(): void {
  safeRemove(KEY.m2);
}

export function readM3(id: MessengerId): Module3Progress | null {
  return safeRead<Module3Progress>(KEY.m3(id));
}

export function writeM3(id: MessengerId, data: Omit<Module3Progress, "updatedAt">): void {
  safeWrite(KEY.m3(id), { ...data, updatedAt: Date.now() });
}

export function clearM3(id: MessengerId): void {
  safeRemove(KEY.m3(id));
}

export function readMessengerPrefs(): MessengerId[] {
  const raw = safeRead<MessengerId[]>(KEY.prefsMessengers);
  return Array.isArray(raw) ? raw : [];
}

export function writeMessengerPrefs(ids: MessengerId[]): void {
  safeWrite(KEY.prefsMessengers, ids);
}

export function readM4Checks(): Record<string, boolean> {
  return safeRead<Record<string, boolean>>(KEY.m4checks) ?? {};
}

export function writeM4Checks(checks: Record<string, boolean>): void {
  safeWrite(KEY.m4checks, checks);
}

export type ModuleStatus = {
  completed: boolean;
  step: number;
  startedAt?: number;
};

export function getAllStatuses() {
  const m1 = readProgress();
  const m2 = readM2();
  const m3max = readM3("max");
  const m3tg = readM3("telegram");
  const m3wa = readM3("whatsapp");
  return {
    m1: m1 ? { step: m1.step, completed: m1.step >= 4 } : null,
    m2: m2 ? { step: m2.step, completed: m2.completed } : null,
    "m3:max": m3max ? { step: m3max.step, completed: m3max.completed } : null,
    "m3:telegram": m3tg ? { step: m3tg.step, completed: m3tg.completed } : null,
    "m3:whatsapp": m3wa ? { step: m3wa.step, completed: m3wa.completed } : null,
  };
}
