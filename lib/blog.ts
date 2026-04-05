import { db } from './db';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export interface BlogPost {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  excerpt: {
    zh: string;
    en: string;
  };
  content: {
    zh: string;
    en: string;
  };
  author: string;
  date: string;
  category: 'news' | 'story' | 'announcement' | 'guide';
  image?: string;
  tags: string[];
}

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: 'news' | 'story' | 'announcement' | 'guide';
  image?: string;
  tags: string[];
}

function rowToPost(row: typeof posts.$inferSelect): BlogPost {
  return {
    id: String(row.id),
    title: { en: row.titleEn, zh: row.titleZh },
    excerpt: { en: row.excerptEn, zh: row.excerptZh },
    content: { en: row.contentEn, zh: row.contentZh },
    author: row.author,
    date: row.date,
    category: row.category as BlogPost['category'],
    image: row.image || undefined,
    tags: JSON.parse(row.tags),
  };
}

// Get all blog post IDs (published only)
export async function getAllPostIds(): Promise<string[]> {
  const rows = await db.select({ id: posts.id }).from(posts).where(eq(posts.status, 'published'));
  return rows.map((r) => String(r.id));
}

// Get blog post by ID
export async function getPostById(id: string): Promise<BlogPost | null> {
  const row = await db.select().from(posts).where(eq(posts.id, Number(id))).get();
  if (!row || row.status !== 'published') return null;
  return rowToPost(row);
}

// Get all blog posts (published only)
export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await db.select().from(posts).where(eq(posts.status, 'published'));
  return rows.map(rowToPost);
}

// Get recent posts
export async function getRecentPosts(limit?: number): Promise<BlogPost[]> {
  const query = db
    .select()
    .from(posts)
    .where(eq(posts.status, 'published'))
    .orderBy(desc(posts.date));

  const rows = limit ? await query.limit(limit) : await query;
  return rows.map(rowToPost);
}

// Get posts by category
export async function getPostsByCategory(category: BlogPost['category']): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.filter((post) => post.category === category);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique tags from all posts
export async function getAllTags(): Promise<string[]> {
  const all = await getAllPosts();
  const tagSet = new Set<string>();
  all.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

// Get tag counts (for tag cloud)
export async function getTagCounts(): Promise<Record<string, number>> {
  const all = await getAllPosts();
  const tagCounts: Record<string, number> = {};
  all.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

// Get related posts by shared tags
export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const currentPost = await getPostById(postId);
  if (!currentPost) return [];

  const allPosts = (await getAllPosts()).filter((post) => post.id !== postId);

  const postsWithScore = allPosts.map((post) => {
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length;
    return { post, score: sharedTags };
  });

  return postsWithScore
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

// Re-export from utils for convenience
export { formatBlogDate } from './blog-utils';
