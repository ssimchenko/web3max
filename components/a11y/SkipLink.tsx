"use client";

import type { MouseEvent } from "react";

export function SkipLink() {
  function focusMain(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const main = document.querySelector("main") as HTMLElement | null;
    if (!main) return;
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: false });
    main.scrollIntoView({ block: "start" });
  }

  return (
    <a
      href="#"
      onClick={focusMain}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:px-5 focus:py-3 focus:rounded-btn focus:bg-accent focus:text-white focus:text-lg focus:font-semibold focus:shadow-lg"
    >
      Перейти к основному содержанию
    </a>
  );
}
