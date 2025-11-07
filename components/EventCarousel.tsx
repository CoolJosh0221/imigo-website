'use client';

import { useState, useEffect } from 'react';
import { getUpcomingEvents, formatEventDate, type Event } from '@/data/events';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function EventCarousel() {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(getUpcomingEvents(3)); // Show max 3 upcoming events
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) {
    return null; // Don't show carousel if no upcoming events
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const currentEvent = events[currentIndex];

  const getCategoryBadge = (category: Event['category']) => {
    const badges = {
      volunteer: { zh: '志工活動', en: 'Volunteer', color: 'bg-blue-100 text-blue-700' },
      cultural: { zh: '文化交流', en: 'Cultural', color: 'bg-purple-100 text-purple-700' },
      training: { zh: '培訓課程', en: 'Training', color: 'bg-green-100 text-green-700' },
      community: { zh: '社區活動', en: 'Community', color: 'bg-orange-100 text-orange-700' }
    };

    const badge = badges[category];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {language === 'zh' ? badge.zh : badge.en}
      </span>
    );
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Carousel Content */}
      <div className="relative h-80 sm:h-96">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 opacity-10" />

        <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {getCategoryBadge(currentEvent.category)}
              <span className="text-sm text-gray-600">
                {formatEventDate(currentEvent.date, language)}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              {currentEvent.title[language]}
            </h3>

            <p className="text-gray-700 mb-4 line-clamp-3">
              {currentEvent.description[language]}
            </p>

            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-sm">{currentEvent.time}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-sm">{currentEvent.location[language]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Link
              href="/blog"
              className="px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {t('events.viewAll')}
            </Link>

            {/* Navigation Dots */}
            <div className="flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {events.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all z-20"
            aria-label="Previous event"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all z-20"
            aria-label="Next event"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
