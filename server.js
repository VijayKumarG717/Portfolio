const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf'
};

// Check if build directory exists
const buildDirExists = fs.existsSync(path.join(__dirname, 'build'));
console.log(`Using ${buildDirExists ? 'build directory' : 'root directory'} to serve files`);

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Handle root URL
  let url = req.url === '/' ? '/index.html' : req.url;
  
  // Try to serve from build directory first, then fall back to root
  let filePath = buildDirExists 
    ? path.join(__dirname, 'build', url) 
    : path.join(__dirname, url.replace(/^\//, ''));
  
  // Get the file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT' && buildDirExists) {
        // For SPAs, return index.html for client-side routing
        fs.readFile(path.join(__dirname, 'build', 'index.html'), (indexErr, indexContent) => {
          if (indexErr) {
            console.error(`File not found: ${filePath}`);
            res.writeHead(404);
            res.end('404 - File Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else if (err.code === 'ENOENT') {
        // Page not found
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 - File Not Found');
      } else {
        // Server error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server`);
}); 