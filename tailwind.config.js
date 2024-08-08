/* eslint-env node */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all relevant file extensions
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 22px -6px black !important",
      },
      colors: {
        primary: "#212121",
        secondary: "#E0E0E0",
        lightText: "#74767e",
        lightBackground: "#eaeaea",
        lightBackgroundHover: "#eaeaea",
      },
    },
  },
  plugins: [],
};
