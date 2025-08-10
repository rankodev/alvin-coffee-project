import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['localhost', '291ccfc89bad.ngrok-free.app', 'alvins-expresso.vercel.app'],
  }
})
