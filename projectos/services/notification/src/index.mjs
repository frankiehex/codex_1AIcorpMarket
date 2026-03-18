export function buildAlerts(tasks, inbox) {
  const urgent = inbox.find((item) => item.priority === 'urgent');
  return [
    { type: 'urgent', title: urgent ? `Urgent: ${urgent.sender}` : 'Urgent queue clear', body: urgent ? urgent.action : 'No urgent CRM conversations pending.', reviewRequired: true },
    { type: 'task-reminder', title: "Today's execution reminder", body: tasks.today.join(' '), reviewRequired: false },
    { type: 'daily-summary', title: 'Daily summary draft ready', body: 'Executive summary prepared for final approval before external send.', reviewRequired: true }
  ];
}
