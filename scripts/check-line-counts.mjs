import fs from 'fs';
import { execSync } from 'child_process';

const files = execSync('git ls-files "*.ts" "*.tsx" "*.mjs"', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .map(f => f.trim())
  .filter(Boolean);

const results = files.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n').length;
  return { file, lines };
}).filter(x => x.lines > 350).sort((a, b) => b.lines - a.lines);

console.table(results);
