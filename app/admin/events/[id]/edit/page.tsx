import { notFound } from 'next/navigation';
import { listContentFiles, getFileContent } from '@/lib/github';
import matter from 'gray-matter';
import { toDateString } from '@/lib/admin-i18n';
import EventEditor from '@/components/admin/EventEditor';
import { updateEvent } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

async function getEventData(id: string) {
  const files = await listContentFiles('events');
  const enFile = files.find((f) => f.name.startsWith(`${id}-`) && f.name.endsWith('.en.md'));
  const zhFile = files.find((f) => f.name.startsWith(`${id}-`) && f.name.endsWith('.zh.md'));

  if (!enFile || !zhFile) return null;

  const [enContent, zhContent] = await Promise.all([
    getFileContent(enFile.path),
    getFileContent(zhFile.path),
  ]);

  const enMatter = matter(enContent.content);
  const zhMatter = matter(zhContent.content);

  const slugMatch = enFile.name.match(/^\d+-(.+)\.en\.md$/);
  const slug = slugMatch ? slugMatch[1] : '';

  return {
    id,
    slug,
    date: toDateString(enMatter.data.date),
    time: String(enMatter.data.time || ''),
    category: String(enMatter.data.category || 'community'),
    image: String(enMatter.data.image || ''),
    registrationLink: String(enMatter.data.registrationLink || ''),
    tags: (enMatter.data.tags as string[]) || [],
    en: {
      title: String(enMatter.data.title || ''),
      location: String(enMatter.data.location || ''),
      description: String(enMatter.data.description || ''),
      content: enMatter.content,
    },
    zh: {
      title: String(zhMatter.data.title || ''),
      location: String(zhMatter.data.location || ''),
      description: String(zhMatter.data.description || ''),
      content: zhMatter.content,
    },
    enSha: enContent.sha,
    zhSha: zhContent.sha,
    enPath: enFile.path,
    zhPath: zhFile.path,
  };
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventData(id);
  if (!event) notFound();

  const { enSha, zhSha, enPath, zhPath, ...initialData } = event;

  async function handleUpdate(data: Parameters<typeof updateEvent>[0]) {
    'use server';
    await updateEvent(data, enSha, zhSha, enPath, zhPath);
  }

  return <EventEditor mode="edit" initialData={initialData} onSubmit={handleUpdate} />;
}
