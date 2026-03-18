import { AnalyzerOutput, ProjectInput } from '../lib/types.js';
import { generateContent } from '../services/content/src/index.js';

export function contentAgent(input: ProjectInput, analysis: AnalyzerOutput) {
  return generateContent(input, analysis);
}
