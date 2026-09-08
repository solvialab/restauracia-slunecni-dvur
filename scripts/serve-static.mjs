import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const port = Number(process.env.PORT || 3001);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon",
};
http
  .createServer((req, res) => {
    try {
      let pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (base) {
        if (pathname === base) {
          res.writeHead(301, { Location: `${base}/` });
          res.end();
          return;
        }
        if (!pathname.startsWith(`${base}/`)) {
          res.writeHead(404);
          res.end();
          return;
        }
        pathname = pathname.slice(base.length);
      }
      let file = path.resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        if (!pathname.endsWith("/")) {
          res.writeHead(301, { Location: `${base}${pathname}/` });
          res.end();
          return;
        }
        file = path.join(file, "index.html");
      }
      if (!fs.existsSync(file)) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          fs.existsSync(path.join(root, "404.html"))
            ? fs.readFileSync(path.join(root, "404.html"))
            : "Not found",
        );
        return;
      }
      const size = fs.statSync(file).size;
      const headers = {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Accept-Ranges": "bytes",
      };
      const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
      if (range) {
        const start = Number(range[1]);
        const end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1);
        if (start > end || start >= size) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end();
          return;
        }
        res.writeHead(206, {
          ...headers,
          "Content-Range": `bytes ${start}-${end}/${size}`,
          "Content-Length": end - start + 1,
        });
        if (req.method === "HEAD") {
          res.end();
          return;
        }
        fs.createReadStream(file, { start, end }).pipe(res);
        return;
      }
      res.writeHead(200, { ...headers, "Content-Length": size });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      fs.createReadStream(file).pipe(res);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Production preview: http://localhost:${port}${base}/`),
  );
