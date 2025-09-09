export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaisei: ['"Kaisei Tokumin"', 'serif'],
        rampart: ['"Rampart One"', 'cursive'],
      }
    },
  },
  plugins: [],
};
