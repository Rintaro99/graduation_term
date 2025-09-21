// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // フロントからの /api/** を Rails(3000)へ中継
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("🏗️ Build-time ENV:", process.env.VITE_API_BASE_URL);

export default defineConfig({
  plugins: [react()],
})
