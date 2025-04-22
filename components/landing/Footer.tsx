import Link from "next/link";
import { landing } from "@/lib/content";

export function Footer() {
  return (
    <footer className="px-6 sm:px-10 py-10 border-t border-ink/10 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-ink-soft">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-ink">
            © {landing.footer.year} {landing.footer.project}
          </span>
          <span>{landing.footer.support}</span>
        </div>
        <nav className="flex gap-4 text-sm" aria-label="Доп. навигация">
          <Link href="/hub" className="hover:text-ink underline-offset-4 hover:underline">
            Обучение
          </Link>
          <Link href="/faq" className="hover:text-ink underline-offset-4 hover:underline">
            Вопросы
          </Link>
        </nav>
      </div>
    </footer>
  );
}
