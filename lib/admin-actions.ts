'use server';

import { redirect } from 'next/navigation';
import { checkPassword, createSession, destroySession } from './auth';
import * as github from './github';
import matter from 'gray-matter';

// Auth actions

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = formData.get('password') as string;
  if (!password) return { error: 'Password is required' };

  const valid = await checkPassword(password);
  if (!valid) return { error: 'Invalid password' };

  await createSession();
  redirect('/admin');
}

export async function logoutAction() {
  await destroySession();
  redirect('/admin/login');
}

// Blog post actions

interface PostData {
  id: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  en: { title: string; excerpt: string; content: string };
  zh: { title: string; excerpt: string; content: string };
}

function buildMarkdown(
  frontmatter: Record<string, unknown>,
  content: string
): string {
  return matter.stringify(content, frontmatter);
}

function buildPostFilePath(id: string, slug: string, lang: 'en' | 'zh') {
  return `content/blog/${id}-${slug}.${lang}.md`;
}

function buildEventFilePath(id: string, slug: string, lang: 'en' | 'zh') {
  return `content/events/${id}-${slug}.${lang}.md`;
}

export async function createPost(data: PostData) {
  const enFrontmatter = {
    title: data.en.title,
    excerpt: data.en.excerpt,
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image || undefined,
    tags: data.tags,
  };
  const zhFrontmatter = {
    title: data.zh.title,
    excerpt: data.zh.excerpt,
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image || undefined,
    tags: data.tags,
  };

  const enMarkdown = buildMarkdown(enFrontmatter, data.en.content);
  const zhMarkdown = buildMarkdown(zhFrontmatter, data.zh.content);

  const enPath = buildPostFilePath(data.id, data.slug, 'en');
  const zhPath = buildPostFilePath(data.id, data.slug, 'zh');

  await github.createFile(enPath, enMarkdown, `Add blog post: ${data.en.title}`);
  await github.createFile(zhPath, zhMarkdown, `Add blog post (zh): ${data.zh.title}`);

  redirect('/admin/posts');
}

export async function updatePost(
  data: PostData,
  enSha: string,
  zhSha: string,
  enPath: string,
  zhPath: string
) {
  const enFrontmatter = {
    title: data.en.title,
    excerpt: data.en.excerpt,
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image || undefined,
    tags: data.tags,
  };
  const zhFrontmatter = {
    title: data.zh.title,
    excerpt: data.zh.excerpt,
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image || undefined,
    tags: data.tags,
  };

  const enMarkdown = buildMarkdown(enFrontmatter, data.en.content);
  const zhMarkdown = buildMarkdown(zhFrontmatter, data.zh.content);

  await github.updateFile(enPath, enMarkdown, enSha, `Update blog post: ${data.en.title}`);
  await github.updateFile(zhPath, zhMarkdown, zhSha, `Update blog post (zh): ${data.zh.title}`);

  redirect('/admin/posts');
}

export async function deletePost(enPath: string, zhPath: string, enSha: string, zhSha: string) {
  await github.deleteFile(enPath, enSha, `Delete blog post: ${enPath}`);
  await github.deleteFile(zhPath, zhSha, `Delete blog post: ${zhPath}`);

  redirect('/admin/posts');
}

// Event actions

interface EventData {
  id: string;
  slug: string;
  date: string;
  time: string;
  category: string;
  image: string;
  registrationLink: string;
  tags: string[];
  en: { title: string; location: string; description: string; content: string };
  zh: { title: string; location: string; description: string; content: string };
}

export async function createEvent(data: EventData) {
  const enFrontmatter = {
    title: data.en.title,
    date: data.date,
    time: data.time,
    location: data.en.location,
    description: data.en.description,
    image: data.image || undefined,
    category: data.category,
    registrationLink: data.registrationLink || undefined,
    tags: data.tags,
  };
  const zhFrontmatter = {
    title: data.zh.title,
    date: data.date,
    time: data.time,
    location: data.zh.location,
    description: data.zh.description,
    image: data.image || undefined,
    category: data.category,
    registrationLink: data.registrationLink || undefined,
    tags: data.tags,
  };

  const enMarkdown = buildMarkdown(enFrontmatter, data.en.content);
  const zhMarkdown = buildMarkdown(zhFrontmatter, data.zh.content);

  const enPath = buildEventFilePath(data.id, data.slug, 'en');
  const zhPath = buildEventFilePath(data.id, data.slug, 'zh');

  await github.createFile(enPath, enMarkdown, `Add event: ${data.en.title}`);
  await github.createFile(zhPath, zhMarkdown, `Add event (zh): ${data.zh.title}`);

  redirect('/admin/events');
}

export async function updateEvent(
  data: EventData,
  enSha: string,
  zhSha: string,
  enPath: string,
  zhPath: string
) {
  const enFrontmatter = {
    title: data.en.title,
    date: data.date,
    time: data.time,
    location: data.en.location,
    description: data.en.description,
    image: data.image || undefined,
    category: data.category,
    registrationLink: data.registrationLink || undefined,
    tags: data.tags,
  };
  const zhFrontmatter = {
    title: data.zh.title,
    date: data.date,
    time: data.time,
    location: data.zh.location,
    description: data.zh.description,
    image: data.image || undefined,
    category: data.category,
    registrationLink: data.registrationLink || undefined,
    tags: data.tags,
  };

  const enMarkdown = buildMarkdown(enFrontmatter, data.en.content);
  const zhMarkdown = buildMarkdown(zhFrontmatter, data.zh.content);

  await github.updateFile(enPath, enMarkdown, enSha, `Update event: ${data.en.title}`);
  await github.updateFile(zhPath, zhMarkdown, zhSha, `Update event (zh): ${data.zh.title}`);

  redirect('/admin/events');
}

export async function deleteEvent(enPath: string, zhPath: string, enSha: string, zhSha: string) {
  await github.deleteFile(enPath, enSha, `Delete event: ${enPath}`);
  await github.deleteFile(zhPath, zhSha, `Delete event: ${zhPath}`);

  redirect('/admin/events');
}
