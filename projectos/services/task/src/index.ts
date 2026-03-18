import { AnalyzerOutput, ProjectInput, TaskBundle } from '../../../lib/types.js';

export function generateTasks(input: ProjectInput, analysis: AnalyzerOutput): TaskBundle {
  return {
    today: [
      `Confirm MVP outcome for ${input.name} and lock a single north-star metric.`,
      'Review analyzer summary and approve the first outreach angle.',
      'Publish one credibility-building update and capture inbound responses.'
    ],
    content: [
      `Turn ${analysis.contentDirections[0]} into a 30-second founder story video.`,
      'Draft a carousel post explaining the target user pain points.',
      'Create one proof-based CTA post inviting demo or waitlist signups.'
    ],
    marketing: [
      'Define one acquisition experiment for organic social and one for outbound.',
      'Prepare a simple landing page offer and lead magnet headline.',
      'Track the top three objections surfaced from competitor alternatives.'
    ],
    customerFollowUp: [
      'Reply to urgent leads within 15 minutes using reviewable templates.',
      'Tag high-value prospects requesting demos or pricing.',
      'Send one daily recap to stakeholders with blockers and wins.'
    ]
  };
}
