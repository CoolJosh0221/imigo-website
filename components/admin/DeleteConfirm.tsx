'use client';

import { useState, useTransition } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';

interface DeleteConfirmProps {
  title: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirm({ title, onConfirm }: DeleteConfirmProps) {
  const { language } = useLanguage();
  const l = (key: string) => ta(key, language);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        {l('common.delete')}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {l('common.delete')} &ldquo;{title}&rdquo;?
            </h3>
            <p className="text-gray-600 mb-6">
              {l('delete.confirm')}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                disabled={isPending}
              >
                {l('common.cancel')}
              </button>
              <button
                onClick={() => {
                  startTransition(async () => {
                    await onConfirm();
                    setOpen(false);
                  });
                }}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? l('common.deleting') : l('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
