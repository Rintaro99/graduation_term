import tailwind from "@tailwindcss/postcss";
import daisyui from "daisyui";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwind(),
    daisyui,
    autoprefixer(),
  ],
};

// export default {
//   plugins: {
//     "@tailwindcss/postcss": {},
//     autoprefixer: {},
//   },
// }
