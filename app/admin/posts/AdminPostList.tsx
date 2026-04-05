'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import DeleteConfirm from '@/components/admin/DeleteConfirm';
import { deletePost, togglePostStatus } from '@/lib/admin-actions';

interface PostSummary {
  id: number;
  title: string;
  titleZh: string;
  date: string;
  category: string;
  status: string;
}

export default function AdminPostList({ posts }: { posts: PostSummary[] }) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{l('posts.title')}</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium"
        >
          {l('posts.new')}
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          {l('posts.empty')}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-gray-900">
                  {language === 'zh' ? post.titleZh : post.title}
                  {post.status === 'draft' && (
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                      {l('common.draft')}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {post.date} &middot; {post.category}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePostStatus(post.id, post.status === 'published' ? 'draft' : 'published')}
                  className={`text-sm font-medium ${
                    post.status === 'published'
                      ? 'text-amber-600 hover:text-amber-800'
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  {post.status === 'published' ? l('common.unpublish') : l('common.publish')}
                </button>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  {l('common.edit')}
                </Link>
                <DeleteConfirm
                  title={language === 'zh' ? post.titleZh : post.title}
                  onConfirm={() => deletePost(post.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
