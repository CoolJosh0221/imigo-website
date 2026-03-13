'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import { logoutAction } from '@/lib/admin-actions';

export default function AdminSidebar() {
  const { language, setLanguage } = useLanguage();
  const l = (key: string) => ta(key, language);

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Link href="/admin" className="text-lg font-bold text-gray-900">
          iMigo Admin
        </Link>
        <button
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          {language === 'en' ? '中文' : 'EN'}
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <NavLink href="/admin">{l('nav.dashboard')}</NavLink>
        <NavLink href="/admin/posts">{l('nav.posts')}</NavLink>
        <NavLink href="/admin/events">{l('nav.events')}</NavLink>
      </nav>
      <div className="p-3 border-t border-gray-200 space-y-1">
        <Link
          href="/"
          className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100"
        >
          {l('nav.view_site')}
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full text-left px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
          >
            {l('nav.sign_out')}
          </button>
        </form>
      </div>
    </aside>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-700"
    >
      {children}
    </Link>
  );
}
