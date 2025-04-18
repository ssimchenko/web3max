import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a2332",
        "ink-soft": "#475569",
        accent: "#2563eb",
        "accent-soft": "#dbeafe",
        success: "#16a34a",
        "success-soft": "#dcfce7",
        danger: "#dc2626",
        "danger-soft": "#fee2e2",
        sand: "#fef9f3",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        base: ["1.125rem", { lineHeight: "1.6" }],
        lg: ["1.25rem", { lineHeight: "1.6" }],
        xl: ["1.5rem", { lineHeight: "1.5" }],
        "2xl": ["1.875rem", { lineHeight: "1.35" }],
        "3xl": ["2.25rem", { lineHeight: "1.25" }],
        "4xl": ["2.75rem", { lineHeight: "1.15" }],
      },
      borderRadius: {
        card: "1rem",
        btn: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
