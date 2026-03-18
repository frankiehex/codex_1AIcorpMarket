import { AnalyzerOutput, ContentBundle, ProjectInput } from '../../../lib/types.js';

export function generateContent(input: ProjectInput, analysis: AnalyzerOutput): ContentBundle {
  const scripts = Array.from({ length: 10 }, (_, index) =>
    `Script ${index + 1}: Hook with the pain of scattered execution, show how ${input.name} organizes strategy/content/CRM in one flow, and end with a CTA to request a demo.`
  );

  return {
    shortVideoScripts: scripts,
    socialPosts: [
      `${input.name} turns one rough project idea into a daily operating system: analysis, tasks, content, CRM, and alerts in minutes.`,
      `Most teams do strategy in docs and execution in chaos. ${input.name} closes that gap with AI agents that keep the pipeline moving.`
    ],
    adCopy: [
      `Launch faster with ${input.name}: an AI Project Company OS that analyzes your project and generates actions instantly.`,
      `Stop juggling tools. Use ${input.name} to turn project inputs into strategy, content, CRM focus, and daily summaries.`
    ],
    dmReplies: [
      'Thanks for reaching out — we reviewed your request and can map your project into an execution plan today. Would you like a walkthrough?',
      'Appreciate the message. Based on your goals, we can prioritize the highest-leverage tasks first and send a tailored recommendation.'
    ]
  };
}
