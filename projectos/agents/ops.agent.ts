import { AnalyzerOutput, ProjectInput } from '../lib/types.js';
import { generateTasks } from '../services/task/src/index.js';

export function opsAgent(input: ProjectInput, analysis: AnalyzerOutput) {
  return generateTasks(input, analysis);
}
