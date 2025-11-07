'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { blogPosts, getRecentPosts, formatBlogDate } from '@/data/blog';
import { events, getUpcomingEvents, getPastEvents, formatEventDate } from '@/data/events';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'blog'>('all');

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents(3);
  const recentPosts = getRecentPosts();

  const getCategoryBadge = (category: string) => {
    const badges: any = {
      news: { zh: '新聞', en: 'News', color: 'bg-blue-100 text-blue-700' },
      story: { zh: '故事', en: 'Story', color: 'bg-purple-100 text-purple-700' },
      announcement: { zh: '公告', en: 'Announcement', color: 'bg-green-100 text-green-700' },
      guide: { zh: '指南', en: 'Guide', color: 'bg-orange-100 text-orange-700' },
      volunteer: { zh: '志工活動', en: 'Volunteer', color: 'bg-blue-100 text-blue-700' },
      cultural: { zh: '文化交流', en: 'Cultural', color: 'bg-purple-100 text-purple-700' },
      training: { zh: '培訓課程', en: 'Training', color: 'bg-green-100 text-green-700' },
      community: { zh: '社區活動', en: 'Community', color: 'bg-orange-100 text-orange-700' }
    };

    const badge = badges[category];
    if (!badge) return null;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {language === 'zh' ? badge.zh : badge.en}
      </span>
    );
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{language === 'zh' ? '最新消息' : 'News & Events'}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600">
            {language === 'zh' ? '掌握 iMigo 的最新動態與活動資訊' : 'Stay updated with iMigo\'s latest news and events'}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'all'
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'zh' ? '全部' : 'All'}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'events'
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'zh' ? '活動日曆' : 'Events'}
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'blog'
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'zh' ? '部落格' : 'Blog Posts'}
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {(activeTab === 'all' || activeTab === 'events') && upcomingEvents.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{language === 'zh' ? '即將到來的活動' : 'Upcoming Events'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    {getCategoryBadge(event.category)}
                    <span className="text-sm text-gray-600">
                      {formatEventDate(event.date, language)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title[language]}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description[language]}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      </svg>
                      <span>{event.location[language]}</span>
                    </div>
                  </div>
                  {event.registrationLink && (
                    <Link
                      href={event.registrationLink}
                      className="mt-4 block text-center px-4 py-2 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      {language === 'zh' ? '立即報名' : 'Register Now'}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      {(activeTab === 'all' || activeTab === 'blog') && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{language === 'zh' ? '最新文章' : 'Latest Posts'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    {getCategoryBadge(post.category)}
                    <span className="text-sm text-gray-600">
                      {formatBlogDate(post.date, language)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title[language]}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt[language]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                      {language === 'zh' ? '閱讀更多' : 'Read More'} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {(activeTab === 'all' || activeTab === 'events') && pastEvents.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{language === 'zh' ? '過往活動' : 'Past Events'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg opacity-75">
                  <div className="flex items-center gap-3 mb-4">
                    {getCategoryBadge(event.category)}
                    <span className="text-sm text-gray-500">
                      {formatEventDate(event.date, language)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title[language]}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {language === 'zh' ? '想參與我們的活動嗎?' : 'Want to Join Our Events?'}
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            {language === 'zh' ? '成為志工夥伴,優先獲得活動資訊' : 'Become a volunteer partner and get priority event updates'}
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            {language === 'zh' ? '立即加入' : 'Join Now'}
          </Link>
        </div>
      </section>
    </main>
  );
}
