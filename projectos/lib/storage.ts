import fs from 'node:fs/promises';
import path from 'node:path';
import { ProjectReport } from './types.js';

const dataFile = path.resolve(process.cwd(), 'projectos/data/projects.json');

type Store = { reports: ProjectReport[] };

async function ensureStore() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify({ reports: [] }, null, 2));
  }
}

export async function readStore(): Promise<Store> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(raw) as Store;
}

export async function writeStore(store: Store) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2));
}

export async function saveReport(report: ProjectReport) {
  const store = await readStore();
  store.reports = [report, ...store.reports.filter((entry) => entry.project.id !== report.project.id)].slice(0, 20);
  await writeStore(store);
  return report;
}
