import { saveReport, readStore } from '../lib/storage.mjs';
import { runWorkflow } from './workflow.mjs';
export async function createProjectReport(input) { const report = await runWorkflow(input); await saveReport(report); return report; }
export async function listReports() { const store = await readStore(); return store.reports; }
