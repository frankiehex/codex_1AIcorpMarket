import { randomUUID } from 'node:crypto';
import { ceoAgent } from '../agents/ceo.agent.js';
import { contentAgent } from '../agents/content.agent.js';
import { crmAgent } from '../agents/crm.agent.js';
import { opsAgent } from '../agents/ops.agent.js';
import { strategyAgent } from '../agents/strategy.agent.js';
import { buildAlerts } from '../services/notification/src/index.js';
import { ProjectInput, ProjectReport } from '../lib/types.js';

export async function runWorkflow(input: ProjectInput): Promise<ProjectReport> {
  const analysis = await strategyAgent(input);
  const tasks = opsAgent(input, analysis);
  const content = contentAgent(input, analysis);
  const crm = crmAgent(input);
  const alerts = buildAlerts(tasks, crm);
  const todayFocus = [analysis.contentDirections[0], tasks.today[0], crm[0].action];
  const ceoRecommendation = ceoAgent(analysis, tasks, crm);
  const dailySummary = `${input.name} now has a completed analysis, ${tasks.today.length} priority tasks, ${content.shortVideoScripts.length} short-form scripts, and ${crm.length} categorized CRM items awaiting approval-aware follow-up.`;

  return {
    project: {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString()
    },
    analysis,
    tasks,
    content,
    crm,
    todayFocus,
    ceoRecommendation,
    alerts,
    dailySummary
  };
}
