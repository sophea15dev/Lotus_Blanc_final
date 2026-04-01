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
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
            return;
          }

          if (req.url?.startsWith('/api/auth/login') && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              console.log('[mock] /api/auth/login body:', body);
              res.setHeader('Content-Type', 'application/json');
              try {
                const payload = JSON.parse(body || '{}');
                const { email, password } = payload;
                const normalizedEmail = String(email || '').trim().toLowerCase();
                const normalizedPassword = String(password || '');
                console.log('[mock] /api/auth/login credentials:', { normalizedEmail, normalizedPassword });

                if (
                  normalizedEmail === 'lotusblanc@email.com' && normalizedPassword === '123456' ||
                  normalizedEmail === 'admin@lotus.com' && normalizedPassword === '123456' ||
                  normalizedEmail.includes('admin') && normalizedPassword.length > 0
                ) {
                  res.statusCode = 200;
                  res.end(JSON.stringify({
                    token: 'mock-admin-token',
                    user: { email: normalizedEmail || 'admin', role: 'admin' },
                    message: 'Login successful',
                  }));
                } else {
                  // dev fallback; no more hard 401 for local testing
                  res.statusCode = 200;
                  res.end(JSON.stringify({
                    token: 'mock-admin-token',
                    user: { email: normalizedEmail || 'admin', role: 'admin' },
                    message: 'Login successful (dev fallback)',
                  }));
                }
              } catch (error) {
                console.error('[mock] /api/auth/login invalid JSON', error);
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