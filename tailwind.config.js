/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "float-shadow": {
          "0%": {
            transform: "scale(0.98) translateY(2px)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
          },
          "50%": {
            transform: "scale(1.02) translateY(-2px)",
            boxShadow: "0 30px 60px -20px rgba(0, 0, 0, 0.08)",
          },
          "100%": {
            transform: "scale(0.98) translateY(2px)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
          },
        },
      },
      animation: {
        "float-shadow": "float-shadow 6.5s linear infinite",
      },
    },
  },
  plugins: [],
};       