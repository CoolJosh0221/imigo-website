import HomeClient from '@/components/HomeClient';
import { getUpcomingEvents } from '@/lib/events';

export default function Home() {
  const upcomingEvents = getUpcomingEvents(3);

  return <HomeClient upcomingEvents={upcomingEvents} />;
}
