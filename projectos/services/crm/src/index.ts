import { CRMMessage, ProjectInput } from '../../../lib/types.js';
import { slugify } from '../../../lib/utils.js';

export function generateInbox(input: ProjectInput): CRMMessage[] {
  return [
    {
      id: `${slugify(input.name)}-1`,
      sender: 'High Intent Lead',
      channel: 'lead_form',
      message: `Need pricing and implementation timeline for ${input.name}.`,
      priority: 'high-value',
      reason: 'Direct pricing intent with implementation urgency.',
      action: 'Send pricing overview and offer a 20-minute strategy call.'
    },
    {
      id: `${slugify(input.name)}-2`,
      sender: 'Existing Prospect',
      channel: 'dm',
      message: 'Our launch is this week. Can you help prioritize tasks today?',
      priority: 'urgent',
      reason: 'Near-term launch deadline and direct request for intervention.',
      action: 'Escalate to Ops Agent and send same-day action plan.'
    },
    {
      id: `${slugify(input.name)}-3`,
      sender: 'Social Commenter',
      channel: 'comment',
      message: 'Interesting concept — does this work for a one-person team?',
      priority: 'general',
      reason: 'Early awareness-stage inquiry.',
      action: 'Reply publicly with solo-founder use case and invite demo.'
    }
  ];
}
