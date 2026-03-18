import { scrapeSource } from '../../../lib/scraper.mjs';
import { unique } from '../../../lib/utils.mjs';
export async function analyzeProject(input) {
  const scraped = await scrapeSource(input.sourceType, input.sourceValue, input.description);
  const signals = unique([...scraped.keywords, ...input.description.split(/\W+/)]).filter(Boolean).slice(0, 8);
  return {
    summary: `${input.name} is framed as a ${input.sourceType} opportunity. The system detected strong signals around ${signals.slice(0, 4).join(', ')} and recommends a fast validation loop focused on demand capture, positioning clarity, and daily execution rhythm.`,
    positioning: `${input.name} should position itself as an AI-powered operating system that turns fragmented project knowledge into clear actions, reusable content, and accountable follow-ups for a lean team.`,
    targetAudience: 'Best-fit audience: founders, operators, solo creators, and small growth teams that need strategy + content + CRM coordination without building a large operations team.',
    competitorSnapshot: [
      'General PM tools: strong task tracking but weak autonomous analysis and content generation.',
      'AI writing tools: strong copy generation but weak project execution orchestration.',
      'CRM suites: strong contact workflows but weak multi-agent strategic planning for early-stage projects.'
    ],
    contentDirections: [
      'Behind-the-scenes operational transparency content',
      'ROI-focused case studies and before/after workflow stories',
      'Educational AI workflow explainers with templates',
      'Urgency-based social content that converts project chaos into clarity'
    ],
    extractedSignals: scraped.highlights
  };
}
