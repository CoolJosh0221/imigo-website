'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
}

export default function ImageUploader({ onUpload, currentUrl }: ImageUploaderProps) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError(l('editor.image_type_error'));
      return;
    }

    if (file.size > 4.5 * 1024 * 1024) {
      setError(l('editor.image_size_error'));
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || l('editor.upload_failed'));
      }

      const { url } = await res.json();
      onUpload(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : l('editor.upload_failed'));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {l('editor.featured_image')}
      </label>
      {currentUrl && (
        <div className="mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUrl}
            alt="Preview"
            className="h-32 w-auto rounded-lg object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
          {uploading ? l('editor.uploading') : l('editor.upload_image')}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <span className="text-xs text-gray-500">{l('editor.or_paste_url')}</span>
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      <input
        type="url"
        value={currentUrl || ''}
        onChange={(e) => onUpload(e.target.value)}
        placeholder="https://..."
        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      />
    </div>
  );
}
