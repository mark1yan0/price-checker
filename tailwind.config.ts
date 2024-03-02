import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "--color-surface-100": "#121212",
        "--color-surface-200": "#282828",
        "--color-surface-300": "#3f3f3f",
        "--color-surface-400": "#575757",
        "--color-surface-500": "#717171",
        "--color-surface-600": "#8b8b8b",
        "--color-surface-mixed-100": "#1a1625",
        "--color-surface-mixed-200": "#2f2b3a",
        "--color-surface-mixed-300": "#46424f",
        "--color-surface-mixed-400": "#5e5a66",
        "--color-surface-mixed-500": "#76737e",
        "--color-surface-mixed-600": "#908d96",
        "--color-primary-100": "#382bf0",
        "--color-primary-200": "#5e43f3",
        "--color-primary-300": "#7a5af5",
        "--color-primary-400": "#9171f8",
        "--color-primary-500": "#a688fa",
        "--color-primary-600": "#ba9ffb",
      },
    },
  },
  plugins: [],
};
export default config;
