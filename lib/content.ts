// Unified content system - combines blog posts and events
import { Event, getAllEvents } from './events';
import { BlogPost, getAllPosts as getBlogPosts, getAllTags as getBlogTags, getTagCounts as getBlogTagCounts } from './blog';

// Convert an event to a blog post format
export function eventToBlogPost(event: Event): BlogPost {
  const categoryMap: Record<Event['category'], BlogPost['category']> = {
    'volunteer': 'announcement',
    'cultural': 'news',
    'training': 'guide',
    'community': 'story'
  };

  return {
    id: `event-${event.id}`,
    title: event.title,
    excerpt: event.description,
    content: event.content || {
      zh: `# ${event.title.zh}

**時間:** ${event.time}
**地點:** ${event.location.zh}

${event.description.zh}

${event.registrationLink ? `[立即報名](${event.registrationLink})` : ''}`,
      en: `# ${event.title.en}

**Time:** ${event.time}
**Location:** ${event.location.en}

${event.description.en}

${event.registrationLink ? `[Register Now](${event.registrationLink})` : ''}`
    },
    author: 'iMigo Team',
    date: event.date,
    category: categoryMap[event.category] || 'news',
    image: event.image,
    tags: event.tags
  };
}

// Get all events as blog posts
export async function getEventsAsPosts(): Promise<BlogPost[]> {
  const allEvents = await getAllEvents();
  return allEvents.map(eventToBlogPost);
}

// Get all content (blog posts + events)
export async function getAllContent(): Promise<BlogPost[]> {
  const [blogPosts, eventPosts] = await Promise.all([
    getBlogPosts(),
    getEventsAsPosts(),
  ]);

  return [...blogPosts, ...eventPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get recent content
export async function getRecentContent(limit?: number): Promise<BlogPost[]> {
  const content = await getAllContent();
  return limit ? content.slice(0, limit) : content;
}

// Get all unique tags from all content
export async function getAllTags(): Promise<string[]> {
  const [blogTags, allEvents] = await Promise.all([
    getBlogTags(),
    getAllEvents(),
  ]);

  const allTags = new Set([...blogTags]);
  allEvents.forEach((event) => {
    event.tags.forEach((tag) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}

// Get tag counts from all content
export async function getTagCounts(): Promise<Record<string, number>> {
  const [blogTagCounts, allEvents] = await Promise.all([
    getBlogTagCounts(),
    getAllEvents(),
  ]);

  const tagCounts = { ...blogTagCounts };
  allEvents.forEach((event) => {
    event.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return tagCounts;
}

// Get content by tag
export async function getContentByTag(tag: string): Promise<BlogPost[]> {
  const allContent = await getAllContent();
  return allContent.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get content by category
export async function getContentByCategory(category: BlogPost['category']): Promise<BlogPost[]> {
  const all = await getAllContent();
  return all.filter((post) => post.category === category);
}

// Check if a post is an event
export function isEvent(postId: string): boolean {
  return postId.startsWith('event-');
}

// Get original event from a post ID
export async function getEventFromPostId(postId: string): Promise<Event | null> {
  if (!isEvent(postId)) return null;

  const eventId = postId.replace('event-', '');
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId) || null;
}
