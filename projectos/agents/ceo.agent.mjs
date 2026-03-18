export function ceoAgent(analysis, tasks, crm) {
  const urgentCount = crm.filter((entry) => entry.priority === 'urgent').length;
  return `CEO recommendation: lead with ${analysis.contentDirections[0].toLowerCase()}, protect focus on the three today tasks, and personally review ${urgentCount} urgent conversation(s) before approving outbound notifications.`;
}
