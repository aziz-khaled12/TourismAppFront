/* eslint-env node */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all relevant file extensions
  ],
  theme: {
    extend: {
      colors: {
        primary: "#212121",
        secondary: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
