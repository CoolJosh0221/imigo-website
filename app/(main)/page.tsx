import HomeClient from '@/components/HomeClient';
import { getUpcomingEvents } from '@/lib/events';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents(8).catch(() => [] as Awaited<ReturnType<typeof getUpcomingEvents>>);

  return <HomeClient upcomingEvents={upcomingEvents} />;
}
