import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center min-h-[3rem] px-6 py-3 rounded-btn text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-blue-700 active:bg-blue-800",
  secondary:
    "bg-white text-ink border border-ink/15 hover:bg-slate-50 active:bg-slate-100",
  ghost: "bg-transparent text-accent hover:bg-accent-soft",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className"> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "href"> & {
    href: string;
  };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", fullWidth, children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`;

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
