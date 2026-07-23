import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Waxaad ku bedeli kartaa port-ka aad rabto
    open: true  // Wuxuu si toos ah ugu furayaa browser-ka marka uu kiciyo
  }
})