'use client';

import { useMemo, useState } from 'react';

type Report = {
  project: { id: string; name: string; sourceType: string; sourceValue: string; description: string; createdAt: string };
  analysis: { summary: string; positioning: string; targetAudience: string; competitorSnapshot: string[]; contentDirections: string[]; extractedSignals: string[] };
  tasks: { today: string[]; content: string[]; marketing: string[]; customerFollowUp: string[] };
  content: { shortVideoScripts: string[]; socialPosts: string[]; adCopy: string[]; dmReplies: string[] };
  crm: { id: string; sender: string; channel: string; message: string; priority: string; reason: string; action: string }[];
  todayFocus: string[];
  ceoRecommendation: string;
  alerts: { type: string; title: string; body: string; reviewRequired: boolean }[];
  dailySummary: string;
};

const emptyForm = {
  name: 'ProjectOS',
  sourceType: 'idea',
  sourceValue: 'AI Project Company OS for small teams',
  description:
    'Build a single-project operating system that analyzes project input, generates tasks and content, prioritizes CRM activity, and drafts daily executive summaries with approval-aware notifications.',
  imageUrl: ''
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export function Dashboard({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = useState(initialReports);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const activeReport = reports[0];

  const metrics = useMemo(() => {
    if (!activeReport) {
      return [
        ['Projects', '0'],
        ['Today tasks', '0'],
        ['Scripts', '0'],
        ['Urgent CRM', '0']
      ];
    }
    return [
      ['Projects', String(reports.length)],
      ['Today tasks', String(activeReport.tasks.today.length)],
      ['Scripts', String(activeReport.content.shortVideoScripts.length)],
      ['Urgent CRM', String(activeReport.crm.filter((item) => item.priority === 'urgent').length)]
    ];
  }, [activeReport, reports.length]);

  async function submitProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed to create project');
      const report = (await response.json()) as Report;
      setReports((current) => [report, ...current]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container grid">
      <div className="hero">
        <section className="card">
          <span className="badge">ProjectOS MVP</span>
          <h1>AI Project Company OS</h1>
          <p className="muted">
            Submit one URL, idea, or product brief and ProjectOS automatically runs multi-agent analysis,
            task generation, content production, CRM prioritization, alert drafting, and daily executive summaries.
          </p>
          <div className="kpis">
            {metrics.map(([label, value]) => (
              <div className="kpi" key={label}>
                <div className="muted">{label}</div>
                <strong style={{ fontSize: 28 }}>{value}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="card">
          <div className="section-title">
            <h2 style={{ margin: 0 }}>Project Intake</h2>
            <span className="badge">5 min analysis target</span>
          </div>
          <form onSubmit={submitProject}>
            <label>
              Project name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              Source type
              <select value={form.sourceType} onChange={(e) => setForm({ ...form, sourceType: e.target.value })}>
                <option value="url">URL</option>
                <option value="idea">Idea</option>
                <option value="product">Product</option>
              </select>
            </label>
            <label>
              URL / product / idea input
              <input value={form.sourceValue} onChange={(e) => setForm({ ...form, sourceValue: e.target.value })} required />
            </label>
            <label>
              Description
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </label>
            <label>
              Image URL (optional)
              <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </label>
            <button disabled={loading}>{loading ? 'Running agents...' : 'Run ProjectOS pipeline'}</button>
          </form>
        </section>
      </div>

      {activeReport ? (
        <>
          <section className="card">
            <div className="section-title">
              <h2 style={{ margin: 0 }}>{activeReport.project.name}</h2>
              <span className="badge">CEO overview</span>
            </div>
            <p className="muted">Source: {activeReport.project.sourceType} · {activeReport.project.sourceValue}</p>
            <p>{activeReport.analysis.summary}</p>
            <div className="columns-3">
              <div>
                <h3>Project analysis</h3>
                <p><strong>Positioning:</strong> {activeReport.analysis.positioning}</p>
                <p><strong>Target audience:</strong> {activeReport.analysis.targetAudience}</p>
              </div>
              <div>
                <h3>Today focus</h3>
                <ul className="list">{activeReport.todayFocus.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>CEO recommendation</h3>
                <p>{activeReport.ceoRecommendation}</p>
              </div>
            </div>
          </section>

          <section className="columns-2">
            <div className="card">
              <div className="section-title"><h2 style={{ margin: 0 }}>Task generator</h2><span className="badge">Ops Agent</span></div>
              <div className="columns-2">
                <div><h3>Today</h3><ul className="list">{activeReport.tasks.today.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Content</h3><ul className="list">{activeReport.tasks.content.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Marketing</h3><ul className="list">{activeReport.tasks.marketing.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Customer follow-up</h3><ul className="list">{activeReport.tasks.customerFollowUp.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </div>

            <div className="card">
              <div className="section-title"><h2 style={{ margin: 0 }}>Analyzer</h2><span className="badge">Strategy Agent</span></div>
              <h3>Competitor snapshot</h3>
              <ul className="list">{activeReport.analysis.competitorSnapshot.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Suggested content directions</h3>
              <ul className="list">{activeReport.analysis.contentDirections.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Extracted signals</h3>
              <ul className="list">{activeReport.analysis.extractedSignals.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>

          <section className="columns-2">
            <div className="card">
              <div className="section-title"><h2 style={{ margin: 0 }}>Content engine</h2><span className="badge">10 scripts in &lt; 1 min</span></div>
              <h3>Short video scripts</h3>
              <ul className="list">{activeReport.content.shortVideoScripts.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Social posts</h3>
              <ul className="list">{activeReport.content.socialPosts.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Ad copy</h3>
              <ul className="list">{activeReport.content.adCopy.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>DM replies</h3>
              <ul className="list">{activeReport.content.dmReplies.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>

            <div className="card">
              <div className="section-title"><h2 style={{ margin: 0 }}>CRM inbox + alerts</h2><span className="badge">Review-aware</span></div>
              <div className="grid">
                {activeReport.crm.map((item) => (
                  <div key={item.id} className={`crm-item priority-${item.priority}`}>
                    <strong>{item.sender}</strong> <span className="muted">({item.channel})</span>
                    <p>{item.message}</p>
                    <p><strong>Priority:</strong> {item.priority} — {item.reason}</p>
                    <p><strong>Next action:</strong> {item.action}</p>
                  </div>
                ))}
              </div>
              <h3>Alert center</h3>
              <div className="grid">
                {activeReport.alerts.map((item) => (
                  <div key={item.title} className="alert-item">
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                    <p className="muted">Type: {item.type} · Review required: {item.reviewRequired ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card">
            <div className="section-title"><h2 style={{ margin: 0 }}>Daily summary</h2><span className="badge">Ops digest</span></div>
            <p>{activeReport.dailySummary}</p>
          </section>
        </>
      ) : (
        <section className="card"><p className="muted">No project has been processed yet. Submit the intake form to generate the first report.</p></section>
      )}

      <p className="footer-note">Single-project MVP with local persistence, provider adapters, and a full mocked execution loop for demo reliability.</p>
    </div>
  );
}
