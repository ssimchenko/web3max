import type { MessengerStep, MessengerModule } from "@/lib/content";

type Brand = MessengerModule["brand"];
type Mock = MessengerStep["mock"];

export function MessengerMockScreen({
  brand,
  mock,
}: {
  brand: Brand;
  mock: Mock;
}) {
  return (
    <div
      className="rounded-card overflow-hidden border border-ink/10 shadow-sm bg-white max-w-md mx-auto"
      aria-hidden="true"
    >
      <div
        className="px-4 py-3 flex items-center gap-3 text-white"
        style={{ background: brand.primary }}
      >
        <button
          type="button"
          tabIndex={-1}
          className="text-xl leading-none"
          aria-label="Назад (имитация)"
        >
          ‹
        </button>
        <p className="font-semibold">{brand.name}</p>
      </div>

      {mock.kind === "settings-list" && <SettingsList mock={mock} brand={brand} />}
      {mock.kind === "input" && <InputScreen mock={mock} brand={brand} />}
      {mock.kind === "code-input" && <CodeScreen mock={mock} brand={brand} />}
      {mock.kind === "toggle" && <ToggleScreen mock={mock} brand={brand} />}
      {mock.kind === "success" && <SuccessScreen mock={mock} brand={brand} />}
    </div>
  );
}

function SettingsList({
  mock,
  brand,
}: {
  mock: Extract<Mock, { kind: "settings-list" }>;
  brand: Brand;
}) {
  return (
    <ul className="divide-y divide-ink/10 bg-white">
      {mock.items.map((item) => {
        const isHighlight = item === mock.highlight;
        return (
          <li
            key={item}
            className={`flex items-center justify-between px-4 py-3 text-base ${
              isHighlight ? "" : "text-ink"
            }`}
            style={
              isHighlight
                ? { background: brand.accent, fontWeight: 600 }
                : undefined
            }
          >
            <span>{item}</span>
            {isHighlight && (
              <span style={{ color: brand.primary }} className="text-xl">
                ›
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function InputScreen({
  mock,
  brand,
}: {
  mock: Extract<Mock, { kind: "input" }>;
  brand: Brand;
}) {
  return (
    <div className="px-5 py-6 bg-white">
      <label className="block text-sm font-medium text-ink-soft mb-2">
        {mock.label}
      </label>
      <div className="h-12 rounded-md border-2 border-dashed flex items-center px-3 text-ink-soft text-sm" style={{ borderColor: brand.primary }}>
        {mock.placeholder}
      </div>
      <div
        className="mt-5 px-4 py-3 rounded-md text-white text-center font-semibold"
        style={{ background: brand.primary }}
      >
        {mock.button}
      </div>
    </div>
  );
}

function CodeScreen({
  mock,
  brand,
}: {
  mock: Extract<Mock, { kind: "code-input" }>;
  brand: Brand;
}) {
  return (
    <div className="px-5 py-6 bg-white">
      <p className="text-sm font-medium text-ink-soft mb-2">{mock.label}</p>
      <p className="text-xs text-ink-soft mb-4">
        Письмо от <span className="font-semibold">{mock.from}</span>
      </p>
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/6] rounded-md border-2 flex items-center justify-center text-xl font-bold"
            style={{
              borderColor: i === 0 ? brand.primary : "#cbd5e1",
              color: brand.primary,
            }}
          >
            {i === 0 ? "•" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleScreen({
  mock,
  brand,
}: {
  mock: Extract<Mock, { kind: "toggle" }>;
  brand: Brand;
}) {
  const isOn = mock.status === "on";
  return (
    <div className="px-5 py-6 bg-white flex items-center justify-between">
      <p className="text-base font-medium">{mock.label}</p>
      <div
        className="w-12 h-7 rounded-full p-1 flex"
        style={{
          background: isOn ? brand.primary : "#cbd5e1",
          justifyContent: isOn ? "flex-end" : "flex-start",
        }}
      >
        <div className="w-5 h-5 rounded-full bg-white" />
      </div>
    </div>
  );
}

function SuccessScreen({
  mock,
  brand,
}: {
  mock: Extract<Mock, { kind: "success" }>;
  brand: Brand;
}) {
  return (
    <div className="px-5 py-10 bg-white text-center">
      <div
        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white"
        style={{ background: brand.primary }}
      >
        ✓
      </div>
      <p className="mt-4 text-xl font-bold">{mock.title}</p>
      <p className="mt-2 text-base text-ink-soft">{mock.subtitle}</p>
    </div>
  );
}
