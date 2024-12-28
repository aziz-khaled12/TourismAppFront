/* eslint-env node */

const { default: zIndex } = require("@mui/material/styles/zIndex");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all relevant file extensions
  ],
  theme: {
    extend: {
     
      animation: {
        "ping-slow": "ping 2s linear infinite",
      },
      boxShadow: {
        custom: "0px 0px 22px -6px black !important",
        upperFade: "0px -20px 17px 13px #f9f9f9",
      },
      colors: {
        primary: "#212121",
        secondary: "#E0E0E0",
        accent: "#edf7ed",
        background: "#f9f9f9",
        lightText: "#74767e",
        lightBackground: "#eaeaea",
        lightBackgroundHover: "#eaeaea",
      },
      zIndex: {
        1000: "1000",
      },
    },
  },
  plugins: [],
};
