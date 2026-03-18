import cors from 'cors';
import express from 'express';
import { z } from 'zod';
import { createProjectReport, listReports } from '../../../orchestrator/engine.js';
import { runDailySummaryJob } from '../../../jobs/dailySummary.job.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const projectSchema = z.object({
  name: z.string().min(2),
  sourceType: z.enum(['url', 'idea', 'product']),
  sourceValue: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal('')).transform((value) => value || undefined)
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'projectos-api' });
});

app.get('/api/projects', async (_req, res) => {
  res.json(await listReports());
});

app.post('/api/projects', async (req, res) => {
  const payload = projectSchema.safeParse(req.body);
  if (!payload.success) {
    return res.status(400).json({ error: payload.error.flatten() });
  }

  const report = await createProjectReport(payload.data);
  return res.status(201).json(report);
});

app.get('/api/daily-summary', async (_req, res) => {
  res.json(await runDailySummaryJob());
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`ProjectOS API listening on http://localhost:${port}`);
});
