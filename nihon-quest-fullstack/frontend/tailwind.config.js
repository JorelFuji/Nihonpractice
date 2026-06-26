export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9c3f59",
          foreground: "#ffffff",
        },
        "primary-container": "#ff8eaa",
        "on-primary": "#ffffff",
        "on-primary-container": "#79233e",
        secondary: {
          DEFAULT: "#006c52",
          foreground: "#ffffff",
        },
        "secondary-container": "#79f9ce",
        "on-secondary": "#ffffff",
        tertiary: "#0d6683",
        "tertiary-container": "#73b9d9",
        background: "#f7f9ff",
        surface: "#f7f9ff",
        "surface-container": "#e6effa",
        "on-surface": "#141c25",
        "on-surface-variant": "#544245",
        error: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#e6effa",
          foreground: "#544245",
        },
        accent: {
          DEFAULT: "#ff8eaa",
          foreground: "#79233e",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#141c25",
        },
        border: "#e6effa",
        input: "#e6effa",
        ring: "#9c3f59",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
