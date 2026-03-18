import http from 'node:http';
import { listReports } from '../../orchestrator/engine.mjs';

const port = Number(process.env.WEB_PORT || 3000);
const apiBase = process.env.API_BASE_URL || 'http://localhost:4000';

const css = `
:root{color-scheme:dark;--bg:#09111f;--panel:#111c30;--panel-2:#16253d;--text:#edf4ff;--muted:#9fb0cf;--accent:#6ee7b7;--accent-2:#60a5fa;--border:rgba(159,176,207,.18)}
*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:linear-gradient(180deg,#08101d,#0d1729 50%,#0a1322);color:var(--text)}
.container{width:min(1200px,calc(100% - 32px));margin:0 auto;padding:32px 0 56px}.grid{display:grid;gap:16px}.hero,.columns-2,.columns-3,.kpis{display:grid;gap:16px}.hero{grid-template-columns:1.5fr 1fr}.columns-2{grid-template-columns:repeat(2,1fr)}.columns-3{grid-template-columns:repeat(3,1fr)}.kpis{grid-template-columns:repeat(4,1fr)}
.card{background:rgba(17,28,48,.92);border:1px solid var(--border);border-radius:20px;padding:20px;box-shadow:0 20px 40px rgba(0,0,0,.18)}.kpi{padding:16px;border-radius:16px;background:var(--panel-2);border:1px solid var(--border)}.muted{color:var(--muted)}
.badge{display:inline-flex;padding:6px 10px;border-radius:999px;background:#0d203a;color:var(--accent);border:1px solid var(--border);font-size:12px}.list{display:grid;gap:10px;padding-left:18px}.crm-item,.alert-item{padding:14px;border-radius:14px;background:#0d1628;border:1px solid var(--border)}.priority-urgent{border-color:rgba(251,113,133,.45)}.priority-high-value{border-color:rgba(110,231,183,.45)}
input,select,textarea,button{font:inherit}form{display:grid;gap:12px}label{display:grid;gap:6px;font-size:14px}input,select,textarea{width:100%;border-radius:12px;border:1px solid var(--border);background:#0b1527;color:var(--text);padding:12px 14px}textarea{min-height:110px;resize:vertical}button{border:0;border-radius:999px;padding:12px 18px;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#08111d;font-weight:700;cursor:pointer}.section-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.footer-note{text-align:center;color:var(--muted);font-size:13px;margin-top:20px}@media(max-width:980px){.hero,.columns-2,.columns-3,.kpis{grid-template-columns:1fr}}
`;

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const list = (items) => `<ul class="list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

function renderDashboard(report, reportsCount) {
  const metrics = report
    ? [['Projects', reportsCount], ['Today tasks', report.tasks.today.length], ['Scripts', report.content.shortVideoScripts.length], ['Urgent CRM', report.crm.filter((item) => item.priority === 'urgent').length]]
    : [['Projects', 0], ['Today tasks', 0], ['Scripts', 0], ['Urgent CRM', 0]];

  const reportSections = report ? `
    <section class="card"><div class="section-title"><h2 style="margin:0">${escapeHtml(report.project.name)}</h2><span class="badge">CEO overview</span></div><p class="muted">Source: ${escapeHtml(report.project.sourceType)} · ${escapeHtml(report.project.sourceValue)}</p><p>${escapeHtml(report.analysis.summary)}</p><div class="columns-3"><div><h3>Project analysis</h3><p><strong>Positioning:</strong> ${escapeHtml(report.analysis.positioning)}</p><p><strong>Target audience:</strong> ${escapeHtml(report.analysis.targetAudience)}</p></div><div><h3>Today focus</h3>${list(report.todayFocus)}</div><div><h3>CEO recommendation</h3><p>${escapeHtml(report.ceoRecommendation)}</p></div></div></section>
    <section class="columns-2"><div class="card"><div class="section-title"><h2 style="margin:0">Task generator</h2><span class="badge">Ops Agent</span></div><div class="columns-2"><div><h3>Today</h3>${list(report.tasks.today)}</div><div><h3>Content</h3>${list(report.tasks.content)}</div><div><h3>Marketing</h3>${list(report.tasks.marketing)}</div><div><h3>Customer follow-up</h3>${list(report.tasks.customerFollowUp)}</div></div></div><div class="card"><div class="section-title"><h2 style="margin:0">Analyzer</h2><span class="badge">Strategy Agent</span></div><h3>Competitor snapshot</h3>${list(report.analysis.competitorSnapshot)}<h3>Suggested content directions</h3>${list(report.analysis.contentDirections)}<h3>Extracted signals</h3>${list(report.analysis.extractedSignals)}</div></section>
    <section class="columns-2"><div class="card"><div class="section-title"><h2 style="margin:0">Content engine</h2><span class="badge">10 scripts in &lt; 1 min</span></div><h3>Short video scripts</h3>${list(report.content.shortVideoScripts)}<h3>Social posts</h3>${list(report.content.socialPosts)}<h3>Ad copy</h3>${list(report.content.adCopy)}<h3>DM replies</h3>${list(report.content.dmReplies)}</div><div class="card"><div class="section-title"><h2 style="margin:0">CRM inbox + alerts</h2><span class="badge">Review-aware</span></div><div class="grid">${report.crm.map((item) => `<div class="crm-item priority-${escapeHtml(item.priority)}"><strong>${escapeHtml(item.sender)}</strong> <span class="muted">(${escapeHtml(item.channel)})</span><p>${escapeHtml(item.message)}</p><p><strong>Priority:</strong> ${escapeHtml(item.priority)} — ${escapeHtml(item.reason)}</p><p><strong>Next action:</strong> ${escapeHtml(item.action)}</p></div>`).join('')}</div><h3>Alert center</h3><div class="grid">${report.alerts.map((item) => `<div class="alert-item"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body)}</p><p class="muted">Type: ${escapeHtml(item.type)} · Review required: ${item.reviewRequired ? 'Yes' : 'No'}</p></div>`).join('')}</div></div></section>
    <section class="card"><div class="section-title"><h2 style="margin:0">Daily summary</h2><span class="badge">Ops digest</span></div><p>${escapeHtml(report.dailySummary)}</p></section>
  ` : '<section class="card"><p class="muted">No project has been processed yet. Submit the intake form to generate the first report.</p></section>';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>ProjectOS Dashboard</title><style>${css}</style></head><body><div class="container grid"><div class="hero"><section class="card"><span class="badge">ProjectOS MVP</span><h1>AI Project Company OS</h1><p class="muted">Submit one URL, idea, or product brief and ProjectOS automatically runs multi-agent analysis, task generation, content production, CRM prioritization, alert drafting, and daily executive summaries.</p><div class="kpis">${metrics.map(([label, value]) => `<div class="kpi"><div class="muted">${label}</div><strong style="font-size:28px">${value}</strong></div>`).join('')}</div></section><section class="card"><div class="section-title"><h2 style="margin:0">Project Intake</h2><span class="badge">5 min analysis target</span></div><form id="project-form"><label>Project name<input name="name" value="ProjectOS" required/></label><label>Source type<select name="sourceType"><option value="url">URL</option><option value="idea" selected>Idea</option><option value="product">Product</option></select></label><label>URL / product / idea input<input name="sourceValue" value="AI Project Company OS for small teams" required/></label><label>Description<textarea name="description" required>Build a single-project operating system that analyzes project input, generates tasks and content, prioritizes CRM activity, and drafts daily executive summaries with approval-aware notifications.</textarea></label><label>Image URL (optional)<input name="imageUrl" value="" /></label><button id="submit-button" type="submit">Run ProjectOS pipeline</button></form></section></div>${reportSections}<p class="footer-note">Single-project MVP with local persistence, provider adapters, and a full mocked execution loop for demo reliability.</p></div><script>
  const form = document.getElementById('project-form');
  const button = document.getElementById('submit-button');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true; button.textContent = 'Running agents...';
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch('${apiBase}/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (response.ok) window.location.reload();
    else { const error = await response.json().catch(() => ({ error: 'Unknown error' })); alert(error.error || 'Failed to create project'); button.disabled = false; button.textContent = 'Run ProjectOS pipeline'; }
  });
</script></body></html>`;
}

http.createServer(async (_req, res) => {
  const reports = await listReports();
  const html = renderDashboard(reports[0], reports.length);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}).listen(port, () => console.log(`ProjectOS web dashboard listening on http://localhost:${port}`));
