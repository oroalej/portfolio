const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,css}",
    "./src/features/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: ["class", "[class~='dark']"],
  theme: {
    extend: {
      colors: {
        ...colors,
        AccentIndigoDye: "#284B63",
        AccentMing: "#3C6E71",
      },
      keyframes: {
        blinking: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        blinking: "blinking 500ms infinite normal",
      },
    },
    screens: {
      xs: "426px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
  experimental: {
    applyComplexClasses: true,
  },
};
