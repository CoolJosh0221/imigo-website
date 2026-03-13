import EventEditor from '@/components/admin/EventEditor';
import { createEvent } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default function NewEventPage() {
  return <EventEditor mode="create" onSubmit={createEvent} />;
}
