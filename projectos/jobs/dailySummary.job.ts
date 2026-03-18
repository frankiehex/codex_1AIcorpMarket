import { listReports } from '../orchestrator/engine.js';

export async function runDailySummaryJob() {
  const reports = await listReports();
  return reports.map((report) => ({
    projectId: report.project.id,
    name: report.project.name,
    summary: report.dailySummary,
    alerts: report.alerts.filter((item) => item.reviewRequired).length
  }));
}
