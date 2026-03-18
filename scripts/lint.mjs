import fs from 'node:fs';
const files = [
  'projectos/apps/api/server.mjs',
  'projectos/apps/web/server.mjs',
  'projectos/orchestrator/workflow.mjs',
  'projectos/lib/storage.mjs'
];
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('TODO')) {
    console.error(`Lint failed: TODO left in ${file}`);
    process.exit(1);
  }
}
console.log('Lint verification passed.');
