import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  include: ['AuthInfo.jsx'],
  server: {
    port: 5006,
  },
preview : {
    port : 5006,
},
  build: {
    rollupOptions: {

    },
    },
})
