import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { defineConfig, type Plugin } from 'vite';

function apiChatDevPlugin(): Plugin {
  return {
    name: 'api-chat-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          try {
            const mod = await server.ssrLoadModule('/api/chat.ts');
            const buffers: Uint8Array[] = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const bodyText = Buffer.concat(buffers).toString('utf-8');

            const origin = `http://${req.headers.host || 'localhost:5173'}`;
            const webReq = new Request(`${origin}/api/chat`, {
              method: 'POST',
              headers: req.headers as Record<string, string>,
              body: bodyText,
            });

            const webRes: Response = await mod.POST(webReq);

            res.statusCode = webRes.status;
            webRes.headers.forEach((val, key) => {
              res.setHeader(key, val);
            });

            if (webRes.body) {
              const reader = webRes.body.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(value);
              }
              res.end();
            } else {
              res.end();
            }
            return;
          } catch (err) {
            console.error('Error in /api/chat dev plugin:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal dev server error' }));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [apiChatDevPlugin(), reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src/'),
      '@/components': resolve(import.meta.dirname, './src/components'),
      '@/pages': resolve(import.meta.dirname, './src/pages'),
      '@/schemas': resolve(import.meta.dirname, './src/schemas'),
      '@/lib': resolve(import.meta.dirname, './src/lib'),
    },
  },
});
