import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="px-6 sm:px-10 py-4 border-b border-ink/10 bg-white sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-ink leading-none"
          aria-label="web3max — на главную"
        >
          web3max
        </Link>

        <nav aria-label="Основная навигация">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/hub"
                className="block px-3 sm:px-4 py-2 rounded-btn text-base font-medium text-ink hover:bg-slate-100 transition-colors"
              >
                Обучение
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="block px-3 sm:px-4 py-2 rounded-btn text-base font-medium text-ink hover:bg-slate-100 transition-colors"
              >
                Вопросы
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
