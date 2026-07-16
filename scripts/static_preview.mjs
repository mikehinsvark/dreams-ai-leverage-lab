import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || 4180);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
};

http.createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const decoded = decodeURIComponent(url.pathname);
  const safe = normalize(decoded).replace(/^([.][.][/\\])+/, '');
  let file = join(root, safe);
  if (!resolve(file).startsWith(root + sep) && resolve(file) !== root) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!decoded.endsWith('/')) {
      res.writeHead(301, { Location: decoded + '/' + url.search + url.hash }).end();
      return;
    }
    file = join(file, 'index.html');
  }
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': mime[extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Static preview: http://localhost:${port}`));
