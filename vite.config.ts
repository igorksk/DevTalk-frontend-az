import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to the ASP.NET Core backend during development
    proxy: {
      '/api': {
        //target: 'https://localhost:52383',
        target: 'https://devtalk-backend-afftbndvehgzfqah.canadaeast-01.azurewebsites.net',
        changeOrigin: true,
        secure: false, // accept ASP.NET Core self-signed dev certificate
      },
    },
  },
});
