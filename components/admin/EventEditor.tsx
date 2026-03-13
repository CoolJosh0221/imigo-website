'use client';

import { useState, useTransition } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import MarkdownPreview from './MarkdownPreview';
import ImageUploader from './ImageUploader';

interface EventEditorProps {
  mode: 'create' | 'edit';
  initialData?: {
    id: string;
    slug: string;
    date: string;
    time: string;
    category: string;
    image: string;
    registrationLink: string;
    tags: string[];
    en: { title: string; location: string; description: string; content: string };
    zh: { title: string; location: string; description: string; content: string };
  };
  onSubmit: (data: {
    id: string;
    slug: string;
    date: string;
    time: string;
    category: string;
    image: string;
    registrationLink: string;
    tags: string[];
    en: { title: string; location: string; description: string; content: string };
    zh: { title: string; location: string; description: string; content: string };
  }) => Promise<void>;
}

const CATEGORIES = ['volunteer', 'cultural', 'training', 'community'];

export default function EventEditor({ mode, initialData, onSubmit }: EventEditorProps) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);

  const [tab, setTab] = useState<'en' | 'zh'>('en');
  const [showPreview, setShowPreview] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [id, setId] = useState(initialData?.id || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initialData?.time || '');
  const [category, setCategory] = useState(initialData?.category || 'community');
  const [image, setImage] = useState(initialData?.image || '');
  const [registrationLink, setRegistrationLink] = useState(initialData?.registrationLink || '');
  const [tagsStr, setTagsStr] = useState(initialData?.tags.join(', ') || '');

  const [enTitle, setEnTitle] = useState(initialData?.en.title || '');
  const [enLocation, setEnLocation] = useState(initialData?.en.location || '');
  const [enDescription, setEnDescription] = useState(initialData?.en.description || '');
  const [enContent, setEnContent] = useState(initialData?.en.content || '');

  const [zhTitle, setZhTitle] = useState(initialData?.zh.title || '');
  const [zhLocation, setZhLocation] = useState(initialData?.zh.location || '');
  const [zhDescription, setZhDescription] = useState(initialData?.zh.description || '');
  const [zhContent, setZhContent] = useState(initialData?.zh.content || '');

  function handleSubmit() {
    if (!id || !slug || !enTitle || !zhTitle) {
      setError(l('editor.required'));
      return;
    }

    setError('');
    startTransition(async () => {
      try {
        await onSubmit({
          id,
          slug,
          date,
          time,
          category,
          image,
          registrationLink,
          tags: tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
          en: { title: enTitle, location: enLocation, description: enDescription, content: enContent },
          zh: { title: zhTitle, location: zhLocation, description: zhDescription, content: zhContent },
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
        {mode === 'create' ? l('events.new_title') : l('events.edit_title')}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Shared fields */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{l('editor.event_details')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.event_id')}</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={mode === 'edit'}
              placeholder="e.g. 8"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.slug')}</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={mode === 'edit'}
              placeholder="e.g. spring-festival"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.time')}</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 14:00 - 17:00"
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.registration_link')}</label>
            <input
              type="url"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <ImageUploader onUpload={setImage} currentUrl={image} />
      </div>

      {/* Language tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('en')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'en'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setTab('zh')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'zh'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
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
                onChange={(e) =>
                  tab === 'en' ? setEnTitle(e.target.value) : setZhTitle(e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.location')}</label>
              <input
                type="text"
                value={tab === 'en' ? enLocation : zhLocation}
                onChange={(e) =>
                  tab === 'en' ? setEnLocation(e.target.value) : setZhLocation(e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.description')}</label>
              <textarea
                value={tab === 'en' ? enDescription : zhDescription}
                onChange={(e) =>
                  tab === 'en'
                    ? setEnDescription(e.target.value)
                    : setZhDescription(e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l('editor.content')}</label>
              <textarea
                value={tab === 'en' ? enContent : zhContent}
                onChange={(e) =>
                  tab === 'en' ? setEnContent(e.target.value) : setZhContent(e.target.value)
                }
                rows={16}
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

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <a
          href="/admin/events"
          className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
        >
          {l('common.cancel')}
        </a>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 text-sm font-medium"
        >
          {isPending ? l('common.saving') : mode === 'create' ? l('common.create_event') : l('common.update_event')}
        </button>
      </div>
    </div>
  );
}
