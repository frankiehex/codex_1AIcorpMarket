CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_value TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE project_reports (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  positioning TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  competitor_snapshot JSONB NOT NULL,
  content_directions JSONB NOT NULL,
  tasks JSONB NOT NULL,
  content_bundle JSONB NOT NULL,
  crm_inbox JSONB NOT NULL,
  alerts JSONB NOT NULL,
  daily_summary TEXT NOT NULL,
  ceo_recommendation TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
