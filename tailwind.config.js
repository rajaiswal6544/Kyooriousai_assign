/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0c0f0c",
        "dark-panel": "#1f1f1f",
        "dark-border": "#2d2d2d",
        "dark-topbar": "#1e1e1e",
        "lime-green": "#B6FF27",
        "black-inner": "#000000",
      },
      borderRadius: {
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
