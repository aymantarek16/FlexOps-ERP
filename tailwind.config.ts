import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-soft": "var(--primary-soft)",
        ink: "#172033",
        muted: "#64748b",
        canvas: "#f7f8fb",
      },
      fontFamily: {
        sans: ["Tajawal", "Cairo", "Segoe UI", "Tahoma", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15, 23, 42, 0.08)",
        card: "0 10px 30px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
