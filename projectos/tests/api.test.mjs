import test from 'node:test';
import assert from 'node:assert/strict';
import { createProjectReport } from '../orchestrator/engine.mjs';
import { runDailySummaryJob } from '../jobs/dailySummary.job.mjs';

test('project pipeline creates a full report', async () => {
  const report = await createProjectReport({
    name: 'ProjectOS Test',
    sourceType: 'idea',
    sourceValue: 'AI operating system',
    description: 'A local test project that validates analysis, tasks, content, crm, alerts, and summaries.'
  });

  assert.equal(report.content.shortVideoScripts.length, 10);
  assert.equal(report.tasks.today.length, 3);
  assert.ok(report.ceoRecommendation.includes('CEO recommendation'));

  const summaries = await runDailySummaryJob();
  assert.ok(summaries.length >= 1);
});
