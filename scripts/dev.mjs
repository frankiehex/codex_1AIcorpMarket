import { spawn } from 'node:child_process';
const api = spawn('node', ['projectos/apps/api/server.mjs'], { stdio: 'inherit' });
const web = spawn('node', ['projectos/apps/web/server.mjs'], { stdio: 'inherit' });
const shutdown = () => { api.kill(); web.kill(); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
