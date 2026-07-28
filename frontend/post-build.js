import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'out');
const distDir = path.join(__dirname, 'dist');
const backendAppHtml = path.join(__dirname, '..', 'backend', 'app.html');
const backendDistAppHtml = path.join(__dirname, '..', 'backend', 'dist', 'app.html');

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(outDir)) {
  console.log('Copying Next.js out/ build to dist/...');
  copyDirSync(outDir, distDir);
}

const indexHtml = path.join(distDir, 'index.html');
const csHtml = path.join(distDir, 'cs.html');
const appHtml = path.join(distDir, 'app.html');

// Pick the full-rendered HTML page (prefer cs.html or index.html if > 10KB)
let sourceHtml = null;
if (fs.existsSync(csHtml) && fs.statSync(csHtml).size > 10000) {
  sourceHtml = csHtml;
} else if (fs.existsSync(indexHtml) && fs.statSync(indexHtml).size > 10000) {
  sourceHtml = indexHtml;
} else if (fs.existsSync(indexHtml)) {
  sourceHtml = indexHtml;
}

if (sourceHtml) {
  fs.copyFileSync(sourceHtml, appHtml);
  fs.copyFileSync(sourceHtml, backendAppHtml);
  
  const backendDistDir = path.dirname(backendDistAppHtml);
  if (!fs.existsSync(backendDistDir)) {
    fs.mkdirSync(backendDistDir, { recursive: true });
  }
  fs.copyFileSync(sourceHtml, backendDistAppHtml);

  if (sourceHtml === csHtml) {
    fs.copyFileSync(sourceHtml, indexHtml);
  }
  console.log(`Successfully updated dist/app.html, dist/index.html, backend/app.html, and backend/dist/app.html from ${path.basename(sourceHtml)} (${fs.statSync(sourceHtml).size} bytes)!`);
} else {
  console.error('Error: No valid HTML file found in dist directory!');
  process.exit(1);
}
