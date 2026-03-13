'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import DeleteConfirm from '@/components/admin/DeleteConfirm';
import { deleteEvent } from '@/lib/admin-actions';

interface EventSummary {
  id: string;
  title: string;
  date: string;
  category: string;
  enPath: string;
  zhPath: string;
  enSha: string;
  zhSha: string;
}

export default function AdminEventList({ events, error }: { events: EventSummary[]; error: string }) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{l('events.title')}</h1>
        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium"
        >
          {l('events.new')}
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          {l('events.empty')}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {event.date} &middot; {event.category}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  {l('common.edit')}
                </Link>
                <DeleteConfirm
                  title={event.title}
                  onConfirm={() => deleteEvent(event.enPath, event.zhPath, event.enSha, event.zhSha)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
