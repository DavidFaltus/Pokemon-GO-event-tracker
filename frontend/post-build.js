import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'out');
const distDir = path.join(__dirname, 'dist');
const backendAppHtml = path.join(__dirname, '..', 'backend', 'app.html');

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

const sourceHtml = fs.existsSync(indexHtml) ? indexHtml : (fs.existsSync(csHtml) ? csHtml : null);

if (sourceHtml) {
  fs.copyFileSync(sourceHtml, appHtml);
  fs.copyFileSync(sourceHtml, backendAppHtml);
  console.log(`Successfully updated dist/app.html and backend/app.html from ${path.basename(sourceHtml)}!`);
} else {
  console.error('Error: No HTML file found in dist directory!');
  process.exit(1);
}
