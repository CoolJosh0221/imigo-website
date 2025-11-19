'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

// Translation data
const translations = {
  zh: {
    nav: {
      home: '首頁',
      about: '關於我們',
      services: '服務內容',
      team: '核心團隊',
      volunteer: '加入志工',
      contact: '聯絡我們',
      blog: '最新消息'
    },
    hero: {
      tagline: '用科技溫度,連結台灣與世界',
      title1: "青春的力量並不微小",
      title2_actions: '行動',
      title2_answer: '答案',
      title2_1: '我們的',
      title2_2: '就是',
      description: '我們是一群充滿熱情的高中生,透過 AI 科技與志工服務,幫助來自世界各地的朋友更好地融入台灣生活。',
      joinButton: '立即加入志工',
      learnMore: '了解更多'
    },
    stats: {
      migrants: '服務移工人數',
      volunteers: '活躍志工夥伴',
      service: '全天候服務',
      languages: '支援語言'
    },
    about: {
      title: '關於 iMigo',
      subtitle: 'i = intelligent + international\nMigo = Amigo (朋友)',
      mission: {
        title: '我們的使命',
        content: '建立連結台灣與世界的橋樑,透過科技與實際行動,幫助來自世界各地的朋友更好地融入台灣生活。'
      },
      philosophy: {
        title: '我們的理念',
        content: '善用科技並尊重多元文化,放下距離先成為朋友,用開放的心胸和創新的思維提供實質協助與溫暖友誼。'
      },
      vision: {
        title: '我們的願景',
        content: '讓 iMigo 成為移工朋友在台灣的第一個朋友,台灣青年參與國際服務的平台,跨文化交流的重要橋樑。'
      }
    },
    services: {
      title: '我們的服務',
      subtitle: '科技 + 溫度的完美結合',
      ai: {
        title: 'AI 智能助理',
        description: '24/7 多語言 LINE 聊天機器人,提供即時生活協助、翻譯服務與資訊查詢'
      },
      matching: {
        title: '志工媒合平台',
        description: '智能配對系統,連結台灣青年志工與移工朋友,提供就醫陪伴、生活協助'
      },
      resources: {
        title: '多語資源中心',
        description: '整合醫療、法律、交通等生活資訊,提供中英印越泰菲六種語言服務'
      },
      culture: {
        title: '文化交流活動',
        description: '定期舉辦文化體驗、語言交換、節慶慶祝等活動,促進跨文化理解'
      }
    },
    team: {
      title: '核心團隊',
      subtitle: ' 只要願意「舉手+點擊」\n就能用一支手機、一句問候，為世界帶來「溫度」'
    },
    volunteerCTA: {
      title: '準備好成為改變的力量了嗎?',
      subtitle: '加入 iMigo,用青春的力量為世界帶來溫度',
      joinButton: '成為志工夥伴',
      learnMore: '了解更多'
    },
    contactCTA: {
      title: '還有其他問題?',
      subtitle: '歡迎透過電子郵件或社群媒體與我們聯繫',
      button: '聯絡我們'
    },
    events: {
      title: '即將到來的活動',
      viewAll: '查看所有活動'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      team: 'Team',
      volunteer: 'Join Us',
      contact: 'Contact',
      blog: 'News & Events'
    },
    hero: {
      tagline: 'Connecting Taiwan and the World with Technology and Warmth',
      title1: "Youth's power is anything but insignificant,",
      title2_actions: 'actions',
      title2_answer: 'answer',
      title2_1: 'Our ',
      title2_2: ' dictate the ',
      description: 'We are a group of passionate high school students using AI technology and volunteer services to help friends from around the world integrate better into life in Taiwan.',
      joinButton: 'Join as Volunteer',
      learnMore: 'Learn More'
    },
    stats: {
      migrants: 'Migrant Workers Served',
      volunteers: 'Active Volunteers',
      service: '24/7 Service',
      languages: 'Languages Supported'
    },
    about: {
      title: 'About iMigo',
      subtitle: 'i = intelligent + international\nMigo = Amigo (friend)',
      mission: {
        title: 'Our Mission',
        content: 'Building bridges between Taiwan and the world through technology and action, helping friends from around the globe integrate better into Taiwanese life.'
      },
      philosophy: {
        title: 'Our Philosophy',
        content: 'Leveraging technology while respecting diverse cultures, putting distance aside to become friends first, providing substantial assistance and warm friendship with open minds and innovative thinking.'
      },
      vision: {
        title: 'Our Vision',
        content: 'Making iMigo the first friend for migrant workers in Taiwan, a platform for Taiwanese youth to engage in international service, and an important bridge for cross-cultural exchange.'
      }
    },
    services: {
      title: 'Our Services',
      subtitle: 'Perfect Combination of Technology + Warmth',
      ai: {
        title: 'AI Smart Assistant',
        description: '24/7 multilingual LINE chatbot providing instant life assistance, translation services, and information queries'
      },
      matching: {
        title: 'Volunteer Matching Platform',
        description: 'Smart matching system connecting Taiwanese youth volunteers with migrant friends, providing medical accompaniment and life assistance'
      },
      resources: {
        title: 'Multilingual Resource Center',
        description: 'Integrating medical, legal, transportation and other life information, providing services in six languages'
      },
      culture: {
        title: 'Cultural Exchange Activities',
        description: 'Regularly organizing cultural experiences, language exchanges, and festival celebrations to promote cross-cultural understanding'
      }
    },
    team: {
      title: 'Core Team',
      subtitle: 'A simple greeting, sent via your phone, radiates warmth across the world.'
    },
    volunteerCTA: {
      title: 'Ready to Become a Force for Change?',
      subtitle: 'Join iMigo and bring warmth to the world with your youthful energy',
      joinButton: 'Become a Volunteer',
      learnMore: 'Learn More'
    },
    contactCTA: {
      title: 'Have Other Questions?',
      subtitle: 'Feel free to contact us via email or social media',
      button: 'Contact Us'
    },
    events: {
      title: 'Upcoming Events',
      viewAll: 'View All Events'
    }
  }
};
