import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f8fafc",
        card: "#1e293b",
        "card-border": "#334155",
        "scada-green": "#22c55e",
        "scada-orange": "#f97316",
        "scada-red": "#ef4444",
        "scada-yellow": "#eab308",
        "scada-gray": "#6b7280",
        "scada-active": "#16a34a",
      },
      animation: {
        "ticker-scroll": "ticker-scroll 30s linear infinite",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
