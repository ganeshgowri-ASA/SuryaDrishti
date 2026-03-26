import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        scada: {
          bg: "#0f172a",
          card: "#1e293b",
          "card-hover": "#334155",
          border: "#334155",
          running: "#22c55e",
          warning: "#f97316",
          fault: "#ef4444",
          waiting: "#eab308",
          "comm-fault": "#6b7280",
          active: "#16a34a",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
