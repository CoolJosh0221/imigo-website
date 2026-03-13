'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';

export default function DashboardClient({
  postCount,
  eventCount,
}: {
  postCount: number;
  eventCount: number;
}) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{l('dashboard.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-3xl font-bold text-orange-600">{postCount}</div>
          <div className="text-sm text-gray-500 mt-1">{l('dashboard.posts')}</div>
          <Link
            href="/admin/posts"
            className="inline-block mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            {l('dashboard.manage_posts')} &rarr;
          </Link>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-3xl font-bold text-blue-600">{eventCount}</div>
          <div className="text-sm text-gray-500 mt-1">{l('dashboard.events')}</div>
          <Link
            href="/admin/events"
            className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {l('dashboard.manage_events')} &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-2">{l('dashboard.how_title')}</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>{l('dashboard.how_1')}</li>
          <li>{l('dashboard.how_2')}</li>
          <li>{l('dashboard.how_3')}</li>
          <li>{l('dashboard.how_4')}</li>
        </ul>
      </div>
    </div>
  );
}
