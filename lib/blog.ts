import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

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

// Get all blog post IDs from the content directory
export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(blogDirectory);
  const ids = new Set<string>();

  fileNames.forEach((fileName) => {
    // Extract ID from filename (e.g., "1-launch-announcement.zh.md" -> "1")
    const match = fileName.match(/^(\d+)-/);
    if (match) {
      ids.add(match[1]);
    }
  });

  return Array.from(ids);
}

// Get blog post by ID (reads both zh and en files)
export function getPostById(id: string): BlogPost | null {
  try {
    const zhFile = fs.readdirSync(blogDirectory).find(f => f.startsWith(`${id}-`) && f.endsWith('.zh.md'));
    const enFile = fs.readdirSync(blogDirectory).find(f => f.startsWith(`${id}-`) && f.endsWith('.en.md'));

    if (!zhFile || !enFile) {
      return null;
    }

    const zhPath = path.join(blogDirectory, zhFile);
    const enPath = path.join(blogDirectory, enFile);

    const zhFileContents = fs.readFileSync(zhPath, 'utf8');
    const enFileContents = fs.readFileSync(enPath, 'utf8');

    const zhMatter = matter(zhFileContents);
    const enMatter = matter(enFileContents);

    const zhData = zhMatter.data as BlogPostMetadata;
    const enData = enMatter.data as BlogPostMetadata;

    return {
      id,
      title: {
        zh: zhData.title,
        en: enData.title,
      },
      excerpt: {
        zh: zhData.excerpt,
        en: enData.excerpt,
      },
      content: {
        zh: zhMatter.content,
        en: enMatter.content,
      },
      author: zhData.author,
      date: zhData.date,
      category: zhData.category,
      image: zhData.image,
      tags: zhData.tags,
    };
  } catch (error) {
    console.error(`Error reading blog post ${id}:`, error);
    return null;
  }
}

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  const ids = getAllPostIds();
  const posts = ids
    .map(id => getPostById(id))
    .filter((post): post is BlogPost => post !== null);

  return posts;
}

// Get recent posts
export function getRecentPosts(limit?: number): BlogPost[] {
  const posts = getAllPosts();
  const sorted = posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

// Get posts by category
export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return getAllPosts().filter(post => post.category === category);
}

// Re-export from utils for convenience
export { formatBlogDate } from './blog-utils';
