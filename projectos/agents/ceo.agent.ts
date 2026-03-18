import { AnalyzerOutput, CRMMessage, TaskBundle } from '../lib/types.js';

export function ceoAgent(analysis: AnalyzerOutput, tasks: TaskBundle, crm: CRMMessage[]) {
  const urgentCount = crm.filter((entry) => entry.priority === 'urgent').length;
  return `CEO recommendation: lead with ${analysis.contentDirections[0].toLowerCase()}, protect focus on the three today tasks, and personally review ${urgentCount} urgent conversation(s) before approving outbound notifications.`;
}
