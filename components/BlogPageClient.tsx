'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { formatBlogDate } from '@/lib/blog-utils';
import { formatEventDate, type Event } from '@/data/events';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import TagCloud from './TagCloud';

interface BlogPost {
  id: string;
  title: { zh: string; en: string };
  excerpt: { zh: string; en: string };
  author: string;
  date: string;
  category: 'news' | 'story' | 'announcement' | 'guide';
  image?: string;
  tags: string[];
}

interface BlogPageClientProps {
  recentPosts?: BlogPost[];
  upcomingEvents?: Event[];
  pastEvents?: Event[];
  initialPosts?: BlogPost[];
  initialEvents?: Event[];
  showTabs?: boolean;
  allTags?: string[];
  tagCounts?: Record<string, number>;
}

export default function BlogPageClient({
  recentPosts = [],
  upcomingEvents = [],
  pastEvents = [],
  initialPosts = [],
  initialEvents = [],
  showTabs = true,
  allTags = [],
  tagCounts = {}
}: BlogPageClientProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'blog'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Use provided data or defaults
  const posts = recentPosts.length > 0 ? recentPosts : initialPosts;
  const upcoming = upcomingEvents.length > 0 ? upcomingEvents : initialEvents.filter(e => new Date(e.date) >= new Date());
  const past = pastEvents.length > 0 ? pastEvents : initialEvents.filter(e => new Date(e.date) < new Date());

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()))
    : posts;

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

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
      {showTabs && (
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
      )}

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <section className="py-6 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'zh' ? '按標籤篩選' : 'Filter by Tags'}
              </h3>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {language === 'zh' ? '清除篩選' : 'Clear Filter'}
                </button>
              )}
            </div>
            <TagCloud
              tags={allTags}
              tagCounts={tagCounts}
              onTagClick={handleTagClick}
              selectedTag={selectedTag || undefined}
            />
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {(activeTab === 'all' || activeTab === 'events') && upcomingEvents.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{language === 'zh' ? '即將到來的活動' : 'Upcoming Events'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                  {event.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={event.image}
                        alt={event.title[language]}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts in Events Tab */}
      {activeTab === 'events' && filteredPosts.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{language === 'zh' ? '最新文章' : 'Latest Posts'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover block">
                  {post.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={post.image}
                        alt={post.title[language]}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {getCategoryBadge(post.category)}
                      <span className="text-sm text-gray-600">
                        {formatBlogDate(post.date, language)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title[language]}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt[language]}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <span className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                        {language === 'zh' ? '閱讀更多' : 'Read More'} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts in All/Blog Tab */}
      {(activeTab === 'all' || activeTab === 'blog') && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{language === 'zh' ? '最新文章' : 'Latest Posts'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover block">
                  {post.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={post.image}
                        alt={post.title[language]}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {getCategoryBadge(post.category)}
                      <span className="text-sm text-gray-600">
                        {formatBlogDate(post.date, language)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title[language]}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt[language]}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <span className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                        {language === 'zh' ? '閱讀更多' : 'Read More'} →
                      </span>
                    </div>
                  </div>
                </Link>
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
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg opacity-75">
                  {event.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={event.image}
                        alt={event.title[language]}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {getCategoryBadge(event.category)}
                      <span className="text-sm text-gray-500">
                        {formatEventDate(event.date, language)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{event.title[language]}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description[language]}</p>
                  </div>
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
