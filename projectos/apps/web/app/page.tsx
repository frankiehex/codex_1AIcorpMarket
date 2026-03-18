import { Dashboard } from '../components/dashboard';

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

async function getReports() {
  try {
    const response = await fetch(`${apiBase}/api/projects`, { cache: 'no-store' });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function Page() {
  const reports = await getReports();
  return <Dashboard initialReports={reports} />;
}
