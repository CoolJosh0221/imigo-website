'use server';

import { redirect } from 'next/navigation';
import { checkPassword, createSession, destroySession } from './auth';
import { db } from './db';
import { posts, events } from '@/db/schema';
import { eq } from 'drizzle-orm';

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
  slug: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  status: string;
  en: { title: string; excerpt: string; content: string };
  zh: { title: string; excerpt: string; content: string };
}

export async function createPost(data: PostData) {
  await db.insert(posts).values({
    slug: data.slug,
    titleEn: data.en.title,
    titleZh: data.zh.title,
    excerptEn: data.en.excerpt,
    excerptZh: data.zh.excerpt,
    contentEn: data.en.content,
    contentZh: data.zh.content,
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image || null,
    tags: JSON.stringify(data.tags),
    status: data.status || 'draft',
  });

  redirect('/admin/posts');
}

export async function updatePost(id: number, data: PostData) {
  await db
    .update(posts)
    .set({
      slug: data.slug,
      titleEn: data.en.title,
      titleZh: data.zh.title,
      excerptEn: data.en.excerpt,
      excerptZh: data.zh.excerpt,
      contentEn: data.en.content,
      contentZh: data.zh.content,
      author: data.author,
      date: data.date,
      category: data.category,
      image: data.image || null,
      tags: JSON.stringify(data.tags),
      status: data.status || 'draft',
      updatedAt: new Date().toISOString(),
    })
    .where(eq(posts.id, id));

  redirect('/admin/posts');
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  redirect('/admin/posts');
}

export async function togglePostStatus(id: number, newStatus: 'draft' | 'published') {
  await db
    .update(posts)
    .set({ status: newStatus, updatedAt: new Date().toISOString() })
    .where(eq(posts.id, id));
  redirect('/admin/posts');
}

// Event actions

interface EventData {
  slug: string;
  date: string;
  time: string;
  category: string;
  image: string;
  registrationLink: string;
  tags: string[];
  status: string;
  en: { title: string; location: string; description: string; content: string };
  zh: { title: string; location: string; description: string; content: string };
}

export async function createEvent(data: EventData) {
  await db.insert(events).values({
    slug: data.slug,
    titleEn: data.en.title,
    titleZh: data.zh.title,
    descriptionEn: data.en.description,
    descriptionZh: data.zh.description,
    contentEn: data.en.content,
    contentZh: data.zh.content,
    date: data.date,
    time: data.time,
    locationEn: data.en.location,
    locationZh: data.zh.location,
    category: data.category,
    image: data.image || null,
    registrationLink: data.registrationLink || null,
    tags: JSON.stringify(data.tags),
    status: data.status || 'draft',
  });

  redirect('/admin/events');
}

export async function updateEvent(id: number, data: EventData) {
  await db
    .update(events)
    .set({
      slug: data.slug,
      titleEn: data.en.title,
      titleZh: data.zh.title,
      descriptionEn: data.en.description,
      descriptionZh: data.zh.description,
      contentEn: data.en.content,
      contentZh: data.zh.content,
      date: data.date,
      time: data.time,
      locationEn: data.en.location,
      locationZh: data.zh.location,
      category: data.category,
      image: data.image || null,
      registrationLink: data.registrationLink || null,
      tags: JSON.stringify(data.tags),
      status: data.status || 'draft',
      updatedAt: new Date().toISOString(),
    })
    .where(eq(events.id, id));

  redirect('/admin/events');
}

export async function deleteEvent(id: number) {
  await db.delete(events).where(eq(events.id, id));
  redirect('/admin/events');
}

export async function toggleEventStatus(id: number, newStatus: 'draft' | 'published') {
  await db
    .update(events)
    .set({ status: newStatus, updatedAt: new Date().toISOString() })
    .where(eq(events.id, id));
  redirect('/admin/events');
}
