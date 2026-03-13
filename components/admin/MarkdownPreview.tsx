'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';

export default function MarkdownPreview({ content }: { content: string }) {
  const { language } = useLanguage();

  if (!content) {
    return (
      <div className="text-gray-400 italic p-4">
        {ta('editor.preview_empty', language)}
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none p-4 overflow-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
