import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const eventsDirectory = path.join(process.cwd(), 'content/events');

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

interface EventMetadata {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  category: 'volunteer' | 'cultural' | 'training' | 'community';
  registrationLink?: string;
  tags: string[];
}

// Get all event IDs from the content directory
export function getAllEventIds(): string[] {
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(eventsDirectory);
  const ids = new Set<string>();

  fileNames.forEach((fileName) => {
    // Extract ID from filename (e.g., "1-lunar-new-year.zh.md" -> "1")
    const match = fileName.match(/^(\d+)-/);
    if (match) {
      ids.add(match[1]);
    }
  });

  return Array.from(ids);
}

// Get event by ID (reads both zh and en files)
export function getEventById(id: string): Event | null {
  try {
    if (!fs.existsSync(eventsDirectory)) {
      return null;
    }

    const zhFile = fs.readdirSync(eventsDirectory).find(f => f.startsWith(`${id}-`) && f.endsWith('.zh.md'));
    const enFile = fs.readdirSync(eventsDirectory).find(f => f.startsWith(`${id}-`) && f.endsWith('.en.md'));

    if (!zhFile || !enFile) {
      return null;
    }

    const zhPath = path.join(eventsDirectory, zhFile);
    const enPath = path.join(eventsDirectory, enFile);

    const zhFileContents = fs.readFileSync(zhPath, 'utf8');
    const enFileContents = fs.readFileSync(enPath, 'utf8');

    const zhMatter = matter(zhFileContents);
    const enMatter = matter(enFileContents);

    const zhData = zhMatter.data as EventMetadata;
    const enData = enMatter.data as EventMetadata;

    return {
      id,
      title: {
        zh: zhData.title,
        en: enData.title,
      },
      date: zhData.date,
      time: zhData.time,
      location: {
        zh: zhData.location,
        en: enData.location,
      },
      description: {
        zh: zhData.description,
        en: enData.description,
      },
      content: {
        zh: zhMatter.content,
        en: enMatter.content,
      },
      image: zhData.image,
      category: zhData.category,
      registrationLink: zhData.registrationLink,
      tags: zhData.tags,
    };
  } catch (error) {
    console.error(`Error reading event ${id}:`, error);
    return null;
  }
}

// Get all events
export function getAllEvents(): Event[] {
  const ids = getAllEventIds();
  const events = ids
    .map(id => getEventById(id))
    .filter((event): event is Event => event !== null);

  return events;
}

// Get upcoming events
export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const upcoming = getAllEvents()
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return limit ? upcoming.slice(0, limit) : upcoming;
}

// Get past events
export function getPastEvents(limit?: number): Event[] {
  const now = new Date();
  const past = getAllEvents()
    .filter(event => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      day: 'numeric'
    });
  }
}
