import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import EventEditor from '@/components/admin/EventEditor';
import { updateEvent } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await db.select().from(events).where(eq(events.id, Number(id))).get();
  if (!event) notFound();

  const initialData = {
    slug: event.slug,
    date: event.date,
    time: event.time,
    category: event.category,
    image: event.image || '',
    registrationLink: event.registrationLink || '',
    tags: JSON.parse(event.tags) as string[],
    status: event.status,
    en: {
      title: event.titleEn,
      location: event.locationEn,
      description: event.descriptionEn,
      content: event.contentEn,
    },
    zh: {
      title: event.titleZh,
      location: event.locationZh,
      description: event.descriptionZh,
      content: event.contentZh,
    },
  };

  async function handleUpdate(data: Parameters<typeof updateEvent>[1]) {
    'use server';
    await updateEvent(Number(id), data);
  }

  return <EventEditor mode="edit" initialData={initialData} onSubmit={handleUpdate} />;
}
