import { listContentFiles, getFileContent } from '@/lib/github';
import matter from 'gray-matter';
import { toDateString } from '@/lib/admin-i18n';
import AdminEventList from './AdminEventList';

export const dynamic = 'force-dynamic';

export interface EventSummary {
  id: string;
  title: string;
  date: string;
  category: string;
  enPath: string;
  zhPath: string;
  enSha: string;
  zhSha: string;
}

async function getEvents(): Promise<EventSummary[]> {
  const files = await listContentFiles('events');
  const enFiles = files.filter((f) => f.name.endsWith('.en.md'));

  const events: EventSummary[] = [];

  for (const enFile of enFiles) {
    const match = enFile.name.match(/^(\d+)-/);
    if (!match) continue;

    const id = match[1];
    const zhFile = files.find((f) => f.name.startsWith(`${id}-`) && f.name.endsWith('.zh.md'));
    if (!zhFile) continue;

    try {
      const enContent = await getFileContent(enFile.path);
      const { data } = matter(enContent.content);

      events.push({
        id,
        title: String(data.title || enFile.name),
        date: toDateString(data.date),
        category: String(data.category || ''),
        enPath: enFile.path,
        zhPath: zhFile.path,
        enSha: enContent.sha,
        zhSha: zhFile.sha,
      });
    } catch {
      // Skip files that fail to parse
    }
  }

  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return events;
}

export default async function AdminEventsPage() {
  let events: EventSummary[] = [];
  let error = '';

  try {
    events = await getEvents();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load events';
  }

  return <AdminEventList events={events} error={error} />;
}
