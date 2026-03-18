import fs from 'node:fs/promises';
import path from 'node:path';
const dataFile = path.resolve(process.cwd(), 'projectos/data/projects.json');
async function ensureStore() {
  try { await fs.access(dataFile); } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify({ reports: [] }, null, 2));
  }
}
export async function readStore() {
  await ensureStore();
  return JSON.parse(await fs.readFile(dataFile, 'utf8'));
}
export async function writeStore(store) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2));
}
export async function saveReport(report) {
  const store = await readStore();
  store.reports = [report, ...store.reports.filter((entry) => entry.project.id !== report.project.id)].slice(0, 20);
  await writeStore(store);
  return report;
}
