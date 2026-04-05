'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import DeleteConfirm from '@/components/admin/DeleteConfirm';
import { deleteEvent, toggleEventStatus } from '@/lib/admin-actions';

interface EventSummary {
  id: number;
  title: string;
  titleZh: string;
  date: string;
  category: string;
  status: string;
}

export default function AdminEventList({ events }: { events: EventSummary[] }) {
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

      {events.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          {l('events.empty')}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-gray-900">
                  {language === 'zh' ? event.titleZh : event.title}
                  {event.status === 'draft' && (
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                      {l('common.draft')}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {event.date} &middot; {event.category}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleEventStatus(event.id, event.status === 'published' ? 'draft' : 'published')}
                  className={`text-sm font-medium ${
                    event.status === 'published'
                      ? 'text-amber-600 hover:text-amber-800'
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  {event.status === 'published' ? l('common.unpublish') : l('common.publish')}
                </button>
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  {l('common.edit')}
                </Link>
                <DeleteConfirm
                  title={language === 'zh' ? event.titleZh : event.title}
                  onConfirm={() => deleteEvent(event.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
