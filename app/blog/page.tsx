import { getRecentPosts } from '@/lib/blog';
import { getUpcomingEvents, getPastEvents } from '@/data/events';
import BlogPageClient from '@/components/BlogPageClient';

export default function BlogPage() {
  const recentPosts = getRecentPosts();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents(3);

  return <BlogPageClient recentPosts={recentPosts} upcomingEvents={upcomingEvents} pastEvents={pastEvents} />;
}
