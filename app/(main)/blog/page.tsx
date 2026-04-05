import { getRecentContent, getAllTags, getTagCounts } from '@/lib/content';
import { getUpcomingEvents, getPastEvents } from '@/lib/events';
import BlogPageClient from '@/components/BlogPageClient';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const [recentPosts, upcomingEvents, pastEvents, allTags, tagCounts] = await Promise.all([
    getRecentContent(),
    getUpcomingEvents(),
    getPastEvents(3),
    getAllTags(),
    getTagCounts(),
  ]);

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
