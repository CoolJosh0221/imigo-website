'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">iMigo</h1>
              <p className="text-xs text-gray-600">Volunteer Club</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.home')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.about')}
            </a>
            <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.services')}
            </a>
            <a href="#team" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.team')}
            </a>
            <a href="#volunteer" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.volunteer')}
            </a>
            <Link href="/blog" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.blog')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('nav.contact')}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors"
              aria-label="Toggle language"
            >
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span className="text-sm font-semibold text-orange-600">
                {language === 'zh' ? 'EN' : '中'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="開啟選單"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <a href="#home" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.home')}
          </a>
          <a href="#about" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.about')}
          </a>
          <a href="#services" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.services')}
          </a>
          <a href="#team" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.team')}
          </a>
          <a href="#volunteer" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.volunteer')}
          </a>
          <Link href="/blog" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.blog')}
          </Link>
          <Link href="/contact" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.contact')}
          </Link>

          {/* Language Toggle for Mobile */}
          <div className="px-6 py-3 border-t">
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors w-full justify-center"
            >
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span className="text-sm font-semibold text-orange-600">
                {language === 'zh' ? 'Switch to English' : '切換到中文'}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
