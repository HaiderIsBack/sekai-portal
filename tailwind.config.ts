// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        // Adds a custom breakpoint at 1440px
        'xxl': '1520px',
      },
    },
  },
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
};
