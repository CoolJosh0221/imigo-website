'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import DeleteConfirm from '@/components/admin/DeleteConfirm';
import { deletePost } from '@/lib/admin-actions';

interface PostSummary {
  id: string;
  title: string;
  date: string;
  category: string;
  enPath: string;
  zhPath: string;
  enSha: string;
  zhSha: string;
}

export default function AdminPostList({ posts, error }: { posts: PostSummary[]; error: string }) {
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

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          {l('posts.empty')}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-gray-900">{post.title}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {post.date} &middot; {post.category}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  {l('common.edit')}
                </Link>
                <DeleteConfirm
                  title={post.title}
                  onConfirm={() => deletePost(post.enPath, post.zhPath, post.enSha, post.zhSha)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
