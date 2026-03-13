'use client';

import { useActionState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ta } from '@/lib/admin-i18n';
import { loginAction } from '@/lib/admin-actions';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const { language, setLanguage } = useLanguage();
  const l = (key: string) => ta(key, language);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{l('login.title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{l('login.subtitle')}</p>
          </div>

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {l('login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder={l('login.placeholder')}
              />
            </div>

            {state?.error && (
              <p className="text-red-600 text-sm">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 text-sm font-medium"
            >
              {isPending ? l('login.signing_in') : l('login.sign_in')}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              {language === 'en' ? '中文' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
