import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// Configuration for my dev servers
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change  port by default its 5173
  server: {
    port: 3000,
  },
})
