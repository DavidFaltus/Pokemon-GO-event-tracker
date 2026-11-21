import fs from 'fs';
import path from 'path';

/**
 * Lightweight zero-dependency .env loader for local development.
 * Loads backend/.env and backend/.env.local if present without overwriting
 * variables already provided by the shell or Google Cloud Run.
 */
export function loadLocalEnvFiles(baseDir: string = path.resolve(__dirname, '..')): void {
  const candidates = ['.env', '.env.local'];

  for (const filename of candidates) {
    const filePath = path.join(baseDir, filename);
    if (!fs.existsSync(filePath)) continue;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;

        const eqIndex = line.indexOf('=');
        if (eqIndex <= 0) continue;

        const key = line.slice(0, eqIndex).trim();
        if (!key || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;

        let value = line.slice(eqIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // Never override real environment variables (Cloud Run / shell)
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }
    } catch (err: any) {
      console.warn(`[env] Could not read ${filename}: ${err?.message || err}`);
    }
  }
}

loadLocalEnvFiles();
