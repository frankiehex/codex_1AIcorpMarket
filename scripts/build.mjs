import fs from 'node:fs';
const required = [
  'projectos/apps/api/server.mjs',
  'projectos/apps/web/server.mjs',
  'projectos/orchestrator/engine.mjs',
  'projectos/db/schema.sql'
];
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required artifact: ${file}`);
    process.exit(1);
  }
}
console.log('Build verification passed. Runtime is dependency-free for local demo.');
