import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2BC0E4",
          50: "#E8F8FC",
          100: "#D1F1F9",
          200: "#A3E3F3",
          300: "#75D5ED",
          400: "#47C7E7",
          500: "#2BC0E4",
          600: "#1A9BC4",
          700: "#147693",
          800: "#0E5162",
          900: "#072B31",
          950: "#041A1E",
        },
        secondary: {
          DEFAULT: "#EAECC6",
          50: "#FAFBF7",
          100: "#F5F7EF",
          200: "#EAECC6",
          300: "#DFE19D",
          400: "#D4D674",
          500: "#C9CB4B",
          600: "#B4B63C",
          700: "#8B8D2E",
          800: "#626420",
          900: "#393B12",
          950: "#20210A",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
