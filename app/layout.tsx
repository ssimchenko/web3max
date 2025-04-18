import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "web3max — безопасные соцсети и мессенджеры",
  description:
    "Спокойный проводник по защите аккаунтов в соцсетях и мессенджерах. Для всех, кто хочет быть в безопасности.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
