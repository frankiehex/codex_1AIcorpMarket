import { ProjectInput } from '../lib/types.js';
import { generateInbox } from '../services/crm/src/index.js';

export function crmAgent(input: ProjectInput) {
  return generateInbox(input);
}
