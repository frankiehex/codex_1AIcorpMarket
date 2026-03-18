import { saveReport, readStore } from '../lib/storage.js';
import { ProjectInput } from '../lib/types.js';
import { runWorkflow } from './workflow.js';

export async function createProjectReport(input: ProjectInput) {
  const report = await runWorkflow(input);
  await saveReport(report);
  return report;
}

export async function listReports() {
  const store = await readStore();
  return store.reports;
}
