import type { Config } from "tailwindcss";

export default {
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
        primary: {
        50: "#FFE4E1",
        100: "#FFCEC7",
        200: "#FE988B",
        300: "#FE6753",
        400: "#FD3519",
        500: "#E41C02",
        600: "#B61702",
        700: "#891101",
        800: "#5B0B01",
        900: "#2E0600",
        950: "#190300"
      }
      },
    },

  
  },
  plugins: [],
} satisfies Config;
