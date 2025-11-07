'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              首頁
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              關於我們
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              服務內容
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              核心團隊
            </Link>
            <Link href="/volunteer" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              加入志工
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              聯絡我們
            </Link>
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
          <Link href="/" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            首頁
          </Link>
          <Link href="/about" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            關於我們
          </Link>
          <Link href="/services" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            服務內容
          </Link>
          <Link href="/team" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            核心團隊
          </Link>
          <Link href="/volunteer" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            加入志工
          </Link>
          <Link href="/contact" className="block px-6 py-3 hover:bg-orange-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            聯絡我們
          </Link>
        </div>
      )}
    </nav>
  );
}
