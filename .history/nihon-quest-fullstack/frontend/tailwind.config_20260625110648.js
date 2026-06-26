export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9c3f59",
        "primary-container": "#ff8eaa",
        "on-primary": "#ffffff",
        "on-primary-container": "#79233e",
        secondary: "#006c52",
        "secondary-container": "#79f9ce",
        "on-secondary": "#ffffff",
        tertiary: "#0d6683",
        "tertiary-container": "#73b9d9",
        background: "#f7f9ff",
        surface: "#f7f9ff",
        "surface-container": "#e6effa",
        "on-surface": "#141c25",
        "on-surface-variant": "#544245",
        error: "#ba1a1a",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
  },
  plugins: [],
}
