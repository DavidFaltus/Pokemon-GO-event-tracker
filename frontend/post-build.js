import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'dist', 'index.html');
const dest = path.join(__dirname, 'dist', 'app.html');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied dist/index.html to dist/app.html (keeping both for Capacitor compatibility)');
} else {
  console.error('Error: dist/index.html not found!');
  process.exit(1);
}
