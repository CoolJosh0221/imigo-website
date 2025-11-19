import { getRecentContent, getAllTags, getTagCounts } from '@/lib/content';
import { getUpcomingEvents, getPastEvents } from '@/lib/events';
import BlogPageClient from '@/components/BlogPageClient';

export default function BlogPage() {
  const recentPosts = getRecentContent();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents(3);
  const allTags = getAllTags();
  const tagCounts = getTagCounts();

  return (
    <BlogPageClient
      recentPosts={recentPosts}
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
      allTags={allTags}
      tagCounts={tagCounts}
    />
  );
}
