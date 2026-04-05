'use client';

import { useState, useTransition } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import MarkdownPreview from './MarkdownPreview';
import ImageUploader from './ImageUploader';

interface PostFormData {
  slug: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  status: string;
  en: { title: string; excerpt: string; content: string };
  zh: { title: string; excerpt: string; content: string };
}

interface PostEditorProps {
  mode: 'create' | 'edit';
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
}

const CATEGORIES = ['announcement', 'news', 'story', 'guide'];

export default function PostEditor({ mode, initialData, onSubmit }: PostEditorProps) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);

  const [tab, setTab] = useState<'en' | 'zh'>('en');
  const [showPreview, setShowPreview] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [slug, setSlug] = useState(initialData?.slug || '');
  const [author, setAuthor] = useState(initialData?.author || 'iMigo Team');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(initialData?.category || 'announcement');
  const [image, setImage] = useState(initialData?.image || '');
  const [tagsStr, setTagsStr] = useState(initialData?.tags.join(', ') || '');
  const [status, setStatus] = useState(initialData?.status || 'draft');

  const [enTitle, setEnTitle] = useState(initialData?.en.title || '');
  const [enExcerpt, setEnExcerpt] = useState(initialData?.en.excerpt || '');
  const [enContent, setEnContent] = useState(initialData?.en.content || '');

  const [zhTitle, setZhTitle] = useState(initialData?.zh.title || '');
  const [zhExcerpt, setZhExcerpt] = useState(initialData?.zh.excerpt || '');
  const [zhContent, setZhContent] = useState(initialData?.zh.content || '');

  function handleSubmit() {
    if (!slug || !enTitle || !zhTitle) {
      setError(l('editor.required'));
      return;
    }

    setError('');
    startTransition(async () => {
      try {
        await onSubmit({
          slug,
          author,
          date,
          category,
          image,
          tags: tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
          status,
          en: { title: enTitle, excerpt: enExcerpt, content: enContent },
          zh: { title: zhTitle, excerpt: zhExcerpt, content: zhContent },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : l('common.error'));
      }
    });
  }

  const currentContent = tab === 'en' ? enContent : zhContent;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {mode === 'create' ? l('posts.new_title') : l('posts.edit_title')}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{l('editor.metadata')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.slug')}</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. my-blog-post"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.author')}</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.date')}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.category')}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.tags')}</label>
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.status')}</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="draft">{l('common.draft')}</option>
              <option value="published">{l('common.published')}</option>
            </select>
          </div>
        </div>
        <ImageUploader onUpload={setImage} currentUrl={image} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('en')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'en' ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setTab('zh')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'zh' ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-3 text-sm font-medium border-l border-gray-200 ${
              showPreview ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {showPreview ? l('editor.hide_preview') : l('editor.preview')}
          </button>
        </div>

        <div className={`${showPreview ? 'grid grid-cols-2' : ''}`}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.title')}</label>
              <input
                type="text"
                value={tab === 'en' ? enTitle : zhTitle}
                onChange={(e) => tab === 'en' ? setEnTitle(e.target.value) : setZhTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.excerpt')}</label>
              <textarea
                value={tab === 'en' ? enExcerpt : zhExcerpt}
                onChange={(e) => tab === 'en' ? setEnExcerpt(e.target.value) : setZhExcerpt(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.content')}</label>
              <textarea
                value={tab === 'en' ? enContent : zhContent}
                onChange={(e) => tab === 'en' ? setEnContent(e.target.value) : setZhContent(e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          {showPreview && (
            <div className="border-l border-gray-200 bg-gray-50 overflow-auto max-h-[600px]">
              <MarkdownPreview content={currentContent} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/posts" className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium">
          {l('common.cancel')}
        </a>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 text-sm font-medium"
        >
          {isPending ? l('common.saving') : mode === 'create' ? l('common.create_post') : l('common.update_post')}
        </button>
      </div>
    </div>
  );
}
