import { listContentFiles } from '@/lib/github';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let postCount = 0;
  let eventCount = 0;

  try {
    const blogFiles = await listContentFiles('blog');
    const eventFiles = await listContentFiles('events');
    postCount = Math.floor(blogFiles.filter((f) => f.name.endsWith('.md')).length / 2);
    eventCount = Math.floor(eventFiles.filter((f) => f.name.endsWith('.md')).length / 2);
  } catch {
    // GitHub API may not be configured yet
  }

  return <DashboardClient postCount={postCount} eventCount={eventCount} />;
}
