import { getPostById, getAllPostIds, getRelatedPosts as getBlogRelatedPosts } from '@/lib/blog';
import { getEventFromPostId, eventToBlogPost, getAllContent } from '@/lib/content';
import { getAllEvents } from '@/lib/events';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/BlogPostClient';

export async function generateStaticParams() {
  // Get regular blog post IDs
  const blogIds = getAllPostIds();

  // Get event IDs (as "event-{id}")
  const events = getAllEvents();
  const eventIds = events.map(event => `event-${event.id}`);

  // Combine both
  const allIds = [...blogIds, ...eventIds];

  return allIds.map((id) => ({ id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let post;

  // Check if this is an event post
  if (id.startsWith('event-')) {
    const event = getEventFromPostId(id);
    if (event) {
      post = eventToBlogPost(event);
    }
  } else {
    // Regular blog post
    post = getPostById(id);
  }

  if (!post) {
    notFound();
  }

  // Get related posts by shared tags from all content (blogs + events)
  const allContent = getAllContent();
  const relatedPosts = allContent
    .filter(p => p.id !== id) // Exclude current post
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
