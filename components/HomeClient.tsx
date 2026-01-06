'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import EventCarousel from './EventCarousel';
import type { Event } from '@/lib/events';

interface HomeClientProps {
  upcomingEvents: Event[];
}

export default function HomeClient({ upcomingEvents }: HomeClientProps) {
  const { language, t } = useLanguage();

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-semibold">{t('hero.tagline')}</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                {t('hero.title1')}<br />
                {t('hero.title2_1')}<span className="gradient-text">{t('hero.title2_actions')}</span>{t('hero.title2_2')}<span className="text-teal-500">{t('hero.title2_answer')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{t('hero.description')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#volunteer" className="text-center px-8 py-4 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                  {t('hero.joinButton')}
                </a>
                <Link href="/blog" className="text-center px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all">
                  {t('hero.learnMore')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 sm:h-96 gradient-bg rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="relative w-32 h-32 bg-white rounded-full mx-auto mb-4 shadow-lg">
                    <Image src="/images/imigo-logo.png" alt="iMigo Logo" fill className="object-contain" priority />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">iMigo</h3>
                  <p className="text-base sm:text-lg opacity-90">{language === 'zh' ? '讓每個人都發光' : 'Let Everyone Shine'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                100+<span className="text-xl sm:text-2xl">{language === 'zh' ? '人' : ''}</span>
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">{t('stats.migrants')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                20+<span className="text-xl sm:text-2xl">{language === 'zh' ? '人' : ''}</span>
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">{t('stats.volunteers')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">{t('stats.service')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                6<span className="text-xl sm:text-2xl">{language === 'zh' ? '種' : ''}</span>
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">{t('stats.languages')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Carousel Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('events.title')}</h2>
          </div>
          <EventCarousel events={upcomingEvents} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('about.title')}</h2>
            <p className="text-lg sm:text-xl text-gray-600">{t('about.subtitle1')}<br/>{t('about.subtitle2')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="text-4xl sm:text-5xl mb-4">🌏</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.mission.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('about.mission.content')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="text-4xl sm:text-5xl mb-4">💡</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.philosophy.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('about.philosophy.content')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="text-4xl sm:text-5xl mb-4">🚀</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.vision.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('about.vision.content')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-lg sm:text-xl text-gray-600">{t('services.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('services.ai.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('services.ai.description')}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('services.matching.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('services.matching.description')}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('services.resources.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('services.resources.description')}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('services.culture.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('services.culture.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('team.title')}</h2>
            <p className="text-lg sm:text-xl text-gray-600">{t('team.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Team Members */}
            {[
              { initial: 'J', name: 'Josh', role: language === 'zh' ? 'AI 開發' : 'AI Dev', desc: language === 'zh' ? '模型訓練 | 數據分析' : 'Model Training | Data Analysis', isFounder: true },
              { initial: 'C', name: 'Coco', role: language === 'zh' ? '溝通策略' : 'Communication Strategy', desc: language === 'zh' ? '國際辯論 | 權益保護' : 'Debate | Rights Protection', isFounder: true },
              { initial: 'Q', name: 'Quentin', role: language === 'zh' ? '營運' : 'Operations', desc: language === 'zh' ? '商業策略 | 用戶研究' : 'Business Strategy | User Research', isFounder: true },
              { initial: 'D', name: 'David', role: language === 'zh' ? 'TBD' : 'TBD', desc: language === 'zh' ? 'TBD' : 'TBD', isFounder: false },
              { initial: 'V', name: 'Vera', role: language === 'zh' ? '財務' : 'Finance', desc: language === 'zh' ? '預算控管 | 財務揭露' : 'Budget Control | Financial Disclosure' },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center shadow-lg card-hover">
                <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">{member.initial}</div>
                {member.isFounder && (
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                    {language === 'zh' ? '創辦人' : 'Founder'}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-orange-600 font-semibold mb-3 text-sm sm:text-base">{member.role}</div>
                <p className="text-xs sm:text-sm text-gray-600">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer CTA Section */}
      <section id="volunteer" className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t('volunteerCTA.title')}</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">{t('volunteerCTA.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all">
              {t('volunteerCTA.joinButton')}
            </Link>
            <a href="#about" className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all">
              {t('volunteerCTA.learnMore')}
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('contactCTA.title')}</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">{t('contactCTA.subtitle')}</p>
          <Link href="/contact" className="inline-block px-10 py-4 gradient-bg text-white rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all">
            {t('contactCTA.button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
