import { ProjectInput } from '../lib/types.js';
import { analyzeProject } from '../services/analyzer/src/index.js';

export async function strategyAgent(input: ProjectInput) {
  return analyzeProject(input);
}
