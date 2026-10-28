import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Instrument Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        canvas: "#f7f7f5",
        surface: "#ffffff",
        ink: "#2b2a27",
        muted: "#6b6963",
        line: "#e6e5e1",
        accent: {
          DEFAULT: "#2747e6",
          hover: "#1d36c0",
          soft: "#eaeeff",
        },
      },
    },
  },
  plugins: [],
};
