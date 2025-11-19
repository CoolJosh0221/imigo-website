// Unified content system - combines blog posts and events
import { Event, events } from '@/data/events';
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
    excerpt: event.description, // Use description as excerpt
    content: {
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
    tags: event.tags || ['event', event.category]
  };
}

// Get all events as blog posts
export function getEventsAsPosts(): BlogPost[] {
  return events.map(eventToBlogPost);
}

// Get all content (blog posts + events)
export function getAllContent(): BlogPost[] {
  const blogPosts = getBlogPosts();
  const eventPosts = getEventsAsPosts();

  return [...blogPosts, ...eventPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get recent content
export function getRecentContent(limit?: number): BlogPost[] {
  const content = getAllContent();
  return limit ? content.slice(0, limit) : content;
}

// Get all unique tags from all content
export function getAllTags(): string[] {
  const blogTags = getBlogTags();
  const eventTags = new Set<string>();

  events.forEach(event => {
    if (event.tags) {
      event.tags.forEach(tag => eventTags.add(tag));
    } else {
      // Default tags if none specified
      eventTags.add('event');
      eventTags.add(event.category);
    }
  });

  const allTags = new Set([...blogTags, ...eventTags]);
  return Array.from(allTags).sort();
}

// Get tag counts from all content
export function getTagCounts(): Record<string, number> {
  const blogTagCounts = getBlogTagCounts();
  const tagCounts = { ...blogTagCounts };

  events.forEach(event => {
    const tags = event.tags || ['event', event.category];
    tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return tagCounts;
}

// Get content by tag
export function getContentByTag(tag: string): BlogPost[] {
  const allContent = getAllContent();
  return allContent.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get content by category
export function getContentByCategory(category: BlogPost['category']): BlogPost[] {
  return getAllContent().filter(post => post.category === category);
}

// Check if a post is an event
export function isEvent(postId: string): boolean {
  return postId.startsWith('event-');
}

// Get original event from a post ID
export function getEventFromPostId(postId: string): Event | null {
  if (!isEvent(postId)) return null;

  const eventId = postId.replace('event-', '');
  return events.find(event => event.id === eventId) || null;
}
