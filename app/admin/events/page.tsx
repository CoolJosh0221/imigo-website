import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { desc } from 'drizzle-orm';
import AdminEventList from './AdminEventList';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date));

  const eventList = allEvents.map((e) => ({
    id: e.id,
    title: e.titleEn,
    titleZh: e.titleZh,
    date: e.date,
    category: e.category,
    status: e.status,
  }));

  return <AdminEventList events={eventList} />;
}
