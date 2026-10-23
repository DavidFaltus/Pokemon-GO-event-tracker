import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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

function localizeHtmlLangFile(filePath, lang) {
  if (!fs.existsSync(filePath) || !filePath.endsWith('.html')) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<html lang="en"')) {
    const updated = content.replace('<html lang="en"', `<html lang="${lang}"`);
    fs.writeFileSync(filePath, updated, 'utf8');
    return 1;
  }
  return 0;
}

function localizeHtmlLangInDir(dirPath, lang) {
  if (!fs.existsSync(dirPath)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      count += localizeHtmlLangInDir(fullPath, lang);
    } else if (entry.name.endsWith('.html')) {
      count += localizeHtmlLangFile(fullPath, lang);
    }
  }
  return count;
}

if (fs.existsSync(outDir)) {
  console.log('Copying Next.js out/ build to dist/...');
  copyDirSync(outDir, distDir);
}

// Localize <html lang="..."> across cs, ja, and ru static HTML pages
for (const lang of ['cs', 'ja', 'ru']) {
  const rootLangHtml = path.join(distDir, `${lang}.html`);
  const langDir = path.join(distDir, lang);
  let patched = localizeHtmlLangFile(rootLangHtml, lang);
  patched += localizeHtmlLangInDir(langDir, lang);
  console.log(`Localized <html lang="${lang}"> in ${patched} HTML files.`);
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

  // Ensure /admin has a static dist/admin/index.html fallback
  const adminHtml = path.join(distDir, 'admin.html');
  const adminDir = path.join(distDir, 'admin');
  const adminIndexHtml = path.join(adminDir, 'index.html');
  if (fs.existsSync(adminHtml)) {
    if (!fs.existsSync(adminDir)) {
      fs.mkdirSync(adminDir, { recursive: true });
    }
    fs.copyFileSync(adminHtml, adminIndexHtml);
  }

  // Copy sitemap.xml & robots.txt to public/, backend root and backend/dist
  const sitemapOut = path.join(outDir, 'sitemap.xml');
  const robotsOut = path.join(outDir, 'robots.txt');
  const publicSitemap = path.join(__dirname, 'public', 'sitemap.xml');
  const publicRobots = path.join(__dirname, 'public', 'robots.txt');
  const backendSitemap = path.join(__dirname, '..', 'backend', 'sitemap.xml');
  const backendRobots = path.join(__dirname, '..', 'backend', 'robots.txt');
  const backendDistSitemap = path.join(__dirname, '..', 'backend', 'dist', 'sitemap.xml');
  const backendDistRobots = path.join(__dirname, '..', 'backend', 'dist', 'robots.txt');

  if (fs.existsSync(sitemapOut)) {
    fs.copyFileSync(sitemapOut, publicSitemap);
    fs.copyFileSync(sitemapOut, backendSitemap);
    fs.copyFileSync(sitemapOut, backendDistSitemap);
  }
  if (fs.existsSync(robotsOut)) {
    fs.copyFileSync(robotsOut, publicRobots);
    fs.copyFileSync(robotsOut, backendRobots);
    fs.copyFileSync(robotsOut, backendDistRobots);
  }

  // Generate up-to-date /llms-full.txt knowledge base
  try {
    const llmsScript = path.join(__dirname, 'scripts', 'generate-llms-full.mjs');
    if (fs.existsSync(llmsScript)) {
      execSync(`node "${llmsScript}"`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.warn('[post-build] Warning: generate-llms-full.mjs failed:', err.message);
  }

  console.log(`Successfully updated dist/app.html, dist/index.html, dist/admin/index.html, backend/app.html, sitemap.xml, and robots.txt from ${path.basename(sourceHtml)} (${fs.statSync(sourceHtml).size} bytes)!`);
} else {
  console.error('Error: No valid HTML file found in dist directory!');
  process.exit(1);
}
