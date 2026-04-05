import { getPostById, getAllPostIds } from '@/lib/blog';
import { getEventFromPostId, eventToBlogPost, getAllContent } from '@/lib/content';
import { getAllEvents } from '@/lib/events';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/BlogPostClient';

export async function generateStaticParams() {
  try {
    // Get regular blog post IDs
    const blogIds = await getAllPostIds();

    // Get event IDs (as "event-{id}")
    const events = await getAllEvents();
    const eventIds = events.map(event => `event-${event.id}`);

    // Combine both
    const allIds = [...blogIds, ...eventIds];

    return allIds.map((id) => ({ id }));
  } catch {
    // DB not available at build time (e.g., first deploy) — use dynamic rendering
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let post;

  // Check if this is an event post
  if (id.startsWith('event-')) {
    const event = await getEventFromPostId(id);
    if (event) {
      post = eventToBlogPost(event);
    }
  } else {
    // Regular blog post
    post = await getPostById(id);
  }

  if (!post) {
    notFound();
  }

  // Get related posts by shared tags from all content (blogs + events)
  const allContent = await getAllContent();
  const relatedPosts = allContent
    .filter(p => p.id !== id)
    .map(p => {
      const sharedTags = p.tags.filter(tag => post.tags.includes(tag)).length;
      return { post: p, score: sharedTags };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.post);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
