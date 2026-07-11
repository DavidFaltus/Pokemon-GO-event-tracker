const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WEB_DIR = __dirname;
const ANDROID_DIR = path.resolve(WEB_DIR, '../../pogo-tracker-new/frontend');

console.log('🚀 Starting sync from Web frontend to Android frontend...');

// Robust recursive copy function
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  // 1. Copy src/ directory
  const srcWeb = path.join(WEB_DIR, 'src');
  const srcAndroid = path.join(ANDROID_DIR, 'src');
  console.log('📁 Copying src/ directory...');
  // First clear destination src to ensure no deleted files remain
  if (fs.existsSync(srcAndroid)) {
    fs.rmSync(srcAndroid, { recursive: true, force: true });
  }
  copyRecursiveSync(srcWeb, srcAndroid);

  // 2. Copy public/ directory
  const publicWeb = path.join(WEB_DIR, 'public');
  const publicAndroid = path.join(ANDROID_DIR, 'public');
  console.log('📁 Copying public/ directory...');
  // First clear destination public to ensure no deleted files remain
  if (fs.existsSync(publicAndroid)) {
    fs.rmSync(publicAndroid, { recursive: true, force: true });
  }
  copyRecursiveSync(publicWeb, publicAndroid);

  // 3. Copy index.html
  const htmlWeb = path.join(WEB_DIR, 'index.html');
  const htmlAndroid = path.join(ANDROID_DIR, 'index.html');
  console.log('📄 Copying index.html...');
  fs.copyFileSync(htmlWeb, htmlAndroid);
} catch (err) {
  console.error('❌ Error during file copy operations:');
  console.error(err);
  process.exit(1);
}

// 4. Sync dependencies in package.json
try {
  console.log('📦 Syncing package.json dependencies...');
  const webPkg = JSON.parse(fs.readFileSync(path.join(WEB_DIR, 'package.json'), 'utf8'));
  const androidPkgPath = path.join(ANDROID_DIR, 'package.json');
  const androidPkg = JSON.parse(fs.readFileSync(androidPkgPath, 'utf8'));

  let pkgChanged = false;

  // Helper to merge dependencies
  function mergeDeps(webDeps = {}, androidDeps = {}) {
    let changed = false;
    const merged = { ...androidDeps };
    for (const [dep, version] of Object.entries(webDeps)) {
      if (merged[dep] !== version) {
        merged[dep] = version;
        changed = true;
      }
    }
    return { merged, changed };
  }

  const depsResult = mergeDeps(webPkg.dependencies, androidPkg.dependencies);
  if (depsResult.changed) {
    androidPkg.dependencies = depsResult.merged;
    pkgChanged = true;
  }

  const devDepsResult = mergeDeps(webPkg.devDependencies, androidPkg.devDependencies);
  if (devDepsResult.changed) {
    androidPkg.devDependencies = devDepsResult.merged;
    pkgChanged = true;
  }

  if (pkgChanged) {
    console.log('📝 package.json dependencies changed, updating Android package.json...');
    fs.writeFileSync(androidPkgPath, JSON.stringify(androidPkg, null, 2) + '\n');
    
    console.log('📥 Running npm install in Android project to sync dependencies...');
    execSync('npm install', { cwd: ANDROID_DIR, stdio: 'inherit' });
  } else {
    console.log('✅ Dependencies are already in sync.');
  }
} catch (err) {
  console.error('❌ Error syncing dependencies:', err);
  process.exit(1);
}

// 5. Run Android Sync (Build and Cap Sync)
console.log('🛠 Building web assets and syncing Capacitor for Android app...');
try {
  execSync('npm run android:sync', { cwd: ANDROID_DIR, stdio: 'inherit' });
  console.log('🎉 Android application updated and synced successfully!');
} catch (error) {
  console.error('❌ Failed to sync Capacitor for Android:', error.message);
  process.exit(1);
}
