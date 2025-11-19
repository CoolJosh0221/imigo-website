'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { formatBlogDate } from '@/lib/blog-utils';
import Link from 'next/link';
import Image from 'next/image';
import BlogPostContent from '@/components/BlogPostContent';

interface BlogPost {
  id: string;
  title: { zh: string; en: string };
  excerpt: { zh: string; en: string };
  content: { zh: string; en: string };
  author: string;
  date: string;
  category: 'news' | 'story' | 'announcement' | 'guide';
  image?: string;
  tags: string[];
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { language } = useLanguage();

  const getCategoryBadge = (category: string) => {
    const badges: any = {
      news: { zh: '新聞', en: 'News', color: 'bg-blue-100 text-blue-700' },
      story: { zh: '故事', en: 'Story', color: 'bg-purple-100 text-purple-700' },
      announcement: { zh: '公告', en: 'Announcement', color: 'bg-green-100 text-green-700' },
      guide: { zh: '指南', en: 'Guide', color: 'bg-orange-100 text-orange-700' }
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
      {/* Back Button */}
      <section className="py-6 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            {language === 'zh' ? '返回文章列表' : 'Back to Blog'}
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            {getCategoryBadge(post.category)}
            <span className="text-gray-600">
              {formatBlogDate(post.date, language)}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{post.author}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-8">
            {post.title[language]}
          </h1>

          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title[language]}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal">
            <div className="text-xl text-gray-600 mb-8 font-medium">
              {post.excerpt[language]}
            </div>

            <BlogPostContent content={post.content[language]} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {language === 'zh' ? '想了解更多?' : 'Want to Learn More?'}
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            {language === 'zh' ? '加入 iMigo,成為改變的力量' : 'Join iMigo and be a force for change'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              {language === 'zh' ? '聯絡我們' : 'Contact Us'}
            </Link>
            <Link
              href="/blog"
              className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-orange-600 transition-all"
            >
              {language === 'zh' ? '閱讀更多文章' : 'Read More Articles'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
