import { db } from './db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface Event {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  date: string;
  time: string;
  location: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  content?: {
    zh: string;
    en: string;
  };
  image?: string;
  category: 'volunteer' | 'cultural' | 'training' | 'community';
  registrationLink?: string;
  tags: string[];
}

function rowToEvent(row: typeof events.$inferSelect): Event {
  return {
    id: String(row.id),
    title: { en: row.titleEn, zh: row.titleZh },
    date: row.date,
    time: row.time,
    location: { en: row.locationEn, zh: row.locationZh },
    description: { en: row.descriptionEn, zh: row.descriptionZh },
    content: { en: row.contentEn, zh: row.contentZh },
    image: row.image || undefined,
    category: row.category as Event['category'],
    registrationLink: row.registrationLink || undefined,
    tags: JSON.parse(row.tags),
  };
}

// Get all event IDs (published only)
export async function getAllEventIds(): Promise<string[]> {
  const rows = await db.select({ id: events.id }).from(events).where(eq(events.status, 'published'));
  return rows.map((r) => String(r.id));
}

// Get event by ID
export async function getEventById(id: string): Promise<Event | null> {
  const row = await db.select().from(events).where(eq(events.id, Number(id))).get();
  if (!row || row.status !== 'published') return null;
  return rowToEvent(row);
}

// Get all events (published only)
export async function getAllEvents(): Promise<Event[]> {
  const rows = await db.select().from(events).where(eq(events.status, 'published'));
  return rows.map(rowToEvent);
}

// Get upcoming events
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const now = new Date().toISOString().split('T')[0];
  const all = await getAllEvents();
  const upcoming = all
    .filter((event) => event.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date));

  return limit ? upcoming.slice(0, limit) : upcoming;
}

// Get past events
export async function getPastEvents(limit?: number): Promise<Event[]> {
  const now = new Date().toISOString().split('T')[0];
  const all = await getAllEvents();
  const past = all
    .filter((event) => event.date < now)
    .sort((a, b) => b.date.localeCompare(a.date));

  return limit ? past.slice(0, limit) : past;
}

// Format event date
export function formatEventDate(dateString: string, language: 'zh' | 'en'): string {
  const date = new Date(dateString);

  if (language === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
