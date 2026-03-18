import http from 'node:http';
import { createProjectReport, listReports } from '../../orchestrator/engine.mjs';
import { runDailySummaryJob } from '../../jobs/dailySummary.job.mjs';

const port = Number(process.env.PORT || 4000);

function send(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function validateProject(body) {
  const required = ['name', 'sourceType', 'sourceValue', 'description'];
  for (const key of required) if (!body[key] || String(body[key]).trim().length < 2) return `${key} is required`;
  if (!['url', 'idea', 'product'].includes(body.sourceType)) return 'sourceType must be url, idea, or product';
  if (String(body.description).trim().length < 10) return 'description must be at least 10 characters';
  return null;
}

const server = http.createServer(async (req, res) => {
  if (!req.url) return send(res, 404, { error: 'Missing URL' });
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method === 'GET' && req.url === '/health') return send(res, 200, { status: 'ok', service: 'projectos-api' });
  if (req.method === 'GET' && req.url === '/api/projects') return send(res, 200, await listReports());
  if (req.method === 'GET' && req.url === '/api/daily-summary') return send(res, 200, await runDailySummaryJob());
  if (req.method === 'POST' && req.url === '/api/projects') {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', async () => {
      try {
        const body = JSON.parse(raw || '{}');
        const error = validateProject(body);
        if (error) return send(res, 400, { error });
        const report = await createProjectReport(body);
        return send(res, 201, report);
      } catch (err) {
        return send(res, 400, { error: err instanceof Error ? err.message : 'Invalid request' });
      }
    });
    return;
  }
  return send(res, 404, { error: 'Not found' });
});

server.listen(port, () => console.log(`ProjectOS API listening on http://localhost:${port}`));
