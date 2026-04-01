import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Custom Mock API Plugin
    {
      name: 'mock-reservation-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/reservations' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json');
              try {
                const payload = JSON.parse(body || '{}');
                const mockResult = {
                  id: 'BK-' + Math.floor(Math.random() * 100000),
                  status: 'confirmed',
                  received: payload,
                  message: 'Mock reservation successful!'
                };
                res.statusCode = 201;
                res.end(JSON.stringify(mockResult));
              } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 5173,
  },
})