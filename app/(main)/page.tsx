import HomeClient from '@/components/HomeClient';
import { getUpcomingEvents } from '@/lib/events';

export const revalidate = 3600;

export default function Home() {
  const upcomingEvents = getUpcomingEvents(8);

  return <HomeClient upcomingEvents={upcomingEvents} />;
}
