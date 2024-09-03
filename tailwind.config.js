/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / 0.9)",
        input: "hsl(var(--input) / 0.9)",
        ring: "hsl(var(--ring) / 0.9)",
        background: "hsl(var(--background) / 0.95)",
        foreground: "hsl(var(--foreground) / 0.9)",
        primary: {
          DEFAULT: "hsl(var(--primary) / 0.9)",
          foreground: "hsl(var(--primary-foreground) / 0.9)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / 0.9)",
          foreground: "hsl(var(--secondary-foreground) / 0.9)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / 0.9)",
          foreground: "hsl(var(--destructive-foreground) / 0.9)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / 0.9)",
          foreground: "hsl(var(--muted-foreground) / 0.9)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / 0.9)",
          foreground: "hsl(var(--accent-foreground) / 0.9)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / 0.9)",
          foreground: "hsl(var(--popover-foreground) / 0.9)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / 0.9)",
          foreground: "hsl(var(--card-foreground) / 0.9)",
        },
        sidebar: {
          DEFAULT: "#252526",
          hover: "#2d2d30",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "particle-drift": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "particle-drift": "particle-drift 10s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};