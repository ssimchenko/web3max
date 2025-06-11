import type { Metadata } from "next";
import "./globals.css";
import { SkipLink } from "@/components/a11y/SkipLink";
import { AccessibilityPanel } from "@/components/a11y/AccessibilityPanel";

export const metadata: Metadata = {
  title: "web3max — безопасные соцсети и мессенджеры",
  description:
    "Спокойный проводник по защите аккаунтов в соцсетях и мессенджерах. Для всех, кто хочет быть в безопасности.",
};

// Применяет сохранённые настройки доступности до первой отрисовки,
// чтобы у вернувшихся пользователей не было «мигания» обычной темой.
const a11yBootScript = `try{var s=JSON.parse(localStorage.getItem('web3max:a11y:settings')||'{}');var d=document.documentElement;if(s.font)d.setAttribute('data-a11y-font',s.font);if(s.theme)d.setAttribute('data-a11y-theme',s.theme);if(s.spacing)d.setAttribute('data-a11y-spacing',s.spacing);if(s.links)d.setAttribute('data-a11y-links',s.links);}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
        <SkipLink />
        <AccessibilityPanel />
        <div className="a11y-content">{children}</div>
      </body>
    </html>
  );
}
