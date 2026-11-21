const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8095;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Página não encontrada');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (urlPath === '/' || urlPath === '/diagnostico' || urlPath === '/diagnostico/') {
    return serveFile(res, path.join(PUBLIC_DIR, 'diagnostico.html'));
  }

  if (urlPath === '/oferta' || urlPath === '/oferta/') {
    return serveFile(res, path.join(PUBLIC_DIR, 'oferta.html'));
  }

  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const fullPath = path.join(PUBLIC_DIR, safePath);

  if (!fullPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Acesso negado');
  }

  fs.stat(fullPath, (err, stats) => {
    if (!err && stats.isFile()) {
      return serveFile(res, fullPath);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - Não encontrado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Quiz:   http://localhost:${PORT}/diagnostico`);
  console.log(`Oferta: http://localhost:${PORT}/oferta`);
});
