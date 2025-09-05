// tailwind.config.js
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zen: ["'Zen Maru Gothic'", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
}
