import { db } from '@/lib/db';
import { posts, events } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [postRows, eventRows, draftPostRows, draftEventRows] = await Promise.all([
    db.select({ count: count() }).from(posts).where(eq(posts.status, 'published')),
    db.select({ count: count() }).from(events).where(eq(events.status, 'published')),
    db.select({ count: count() }).from(posts).where(eq(posts.status, 'draft')),
    db.select({ count: count() }).from(events).where(eq(events.status, 'draft')),
  ]);

  return (
    <DashboardClient
      postCount={postRows[0].count}
      eventCount={eventRows[0].count}
      draftPostCount={draftPostRows[0].count}
      draftEventCount={draftEventRows[0].count}
    />
  );
}
