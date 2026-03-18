export type ProjectInput = {
  name: string;
  sourceType: 'url' | 'idea' | 'product';
  sourceValue: string;
  description: string;
  imageUrl?: string;
};

export type AnalyzerOutput = {
  summary: string;
  positioning: string;
  targetAudience: string;
  competitorSnapshot: string[];
  contentDirections: string[];
  extractedSignals: string[];
};

export type TaskBundle = {
  today: string[];
  content: string[];
  marketing: string[];
  customerFollowUp: string[];
};

export type ContentBundle = {
  shortVideoScripts: string[];
  socialPosts: string[];
  adCopy: string[];
  dmReplies: string[];
};

export type CRMMessage = {
  id: string;
  sender: string;
  channel: 'comment' | 'dm' | 'lead_form';
  message: string;
  priority: 'urgent' | 'high-value' | 'general';
  reason: string;
  action: string;
};

export type AlertItem = {
  type: 'urgent' | 'daily-summary' | 'task-reminder';
  title: string;
  body: string;
  reviewRequired: boolean;
};

export type ProjectReport = {
  project: ProjectInput & { id: string; createdAt: string };
  analysis: AnalyzerOutput;
  tasks: TaskBundle;
  content: ContentBundle;
  crm: CRMMessage[];
  todayFocus: string[];
  ceoRecommendation: string;
  alerts: AlertItem[];
  dailySummary: string;
};
