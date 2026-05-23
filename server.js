// ============================================================
// AVIACIONES EL COSO - Servidor local
// Ejecutar: node server.js
// Luego abrir: http://localhost:3000
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {

  // ── PROXY para la API de Anthropic ──────────────────────────
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const apiKey = process.env.ANTHROPIC_API_KEY || '';
      if (!apiKey) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Falta la variable de entorno ANTHROPIC_API_KEY' }));
        return;
      }

      const payload = Buffer.from(body);
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Length': payload.length,
        },
      };

      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (e) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      });

      proxyReq.write(payload);
      proxyReq.end();
    });
    return;
  }

  // ── Archivos estáticos ───────────────────────────────────────
  let filePath = '.' + req.url.split('?')[0];
  if (filePath === './') filePath = './index.html';

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Archivo no encontrado: ' + filePath);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ✈️  Aviaciones El Coso - Servidor iniciado');
  console.log(`  🌐  Abrí en el navegador: http://localhost:${PORT}`);
  console.log('');
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('  ⚠️  ATENCIÓN: No se detectó ANTHROPIC_API_KEY.');
    console.log('      El chat con IA no funcionará hasta que la configures.');
    console.log('      Ejecutá: set ANTHROPIC_API_KEY=tu_clave   (Windows)');
    console.log('              export ANTHROPIC_API_KEY=tu_clave  (Mac/Linux)');
    console.log('');
  }
});
