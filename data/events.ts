// Easy-to-update event data
// Add new events by copying the structure below

export interface Event {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  date: string; // ISO format: YYYY-MM-DD
  time: string;
  location: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  image?: string; // Optional image URL
  category: 'volunteer' | 'cultural' | 'training' | 'community';
  registrationLink?: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: {
      zh: '春節文化交流活動',
      en: 'Lunar New Year Cultural Exchange'
    },
    date: '2025-02-01',
    time: '14:00 - 17:00',
    location: {
      zh: '台北市松山區文化中心',
      en: 'Songshan District Cultural Center, Taipei'
    },
    description: {
      zh: '與移工朋友一起慶祝農曆新年,體驗台灣傳統文化,包括包餃子、寫春聯等活動。歡迎所有志工和移工朋友參加!',
      en: 'Celebrate Lunar New Year with migrant friends, experience traditional Taiwanese culture including making dumplings and writing spring couplets. All volunteers and migrant friends welcome!'
    },
    category: 'cultural',
    registrationLink: '#'
  },
  {
    id: '2',
    title: {
      zh: '志工培訓工作坊',
      en: 'Volunteer Training Workshop'
    },
    date: '2025-02-15',
    time: '10:00 - 16:00',
    location: {
      zh: '線上進行 (Zoom)',
      en: 'Online (Zoom)'
    },
    description: {
      zh: '新志工培訓課程,學習跨文化溝通技巧、基礎翻譯能力及志工服務須知。完成培訓後即可開始服務!',
      en: 'New volunteer training course covering cross-cultural communication skills, basic translation abilities, and volunteer service guidelines. Start serving after completion!'
    },
    category: 'training',
    registrationLink: '#'
  },
  {
    id: '3',
    title: {
      zh: '週末語言交換聚會',
      en: 'Weekend Language Exchange Meetup'
    },
    date: '2025-02-22',
    time: '15:00 - 18:00',
    location: {
      zh: '台北市大安森林公園',
      en: 'Daan Forest Park, Taipei'
    },
    description: {
      zh: '輕鬆的語言交換活動,台灣志工與移工朋友互相學習中文、英文及其他語言。在公園野餐的同時認識新朋友!',
      en: 'Casual language exchange where Taiwanese volunteers and migrant friends learn Chinese, English and other languages together. Make new friends while picnicking in the park!'
    },
    category: 'community',
    registrationLink: '#'
  },
  {
    id: '4',
    title: {
      zh: '醫療陪伴志工說明會',
      en: 'Medical Accompaniment Volunteer Orientation'
    },
    date: '2025-03-05',
    time: '19:00 - 21:00',
    location: {
      zh: '線上進行 (Google Meet)',
      en: 'Online (Google Meet)'
    },
    description: {
      zh: '了解如何成為醫療陪伴志工,協助移工朋友就醫時的翻譯與陪伴服務。需具備基本外語能力。',
      en: 'Learn how to become a medical accompaniment volunteer, assisting migrant friends with translation and support during medical visits. Basic foreign language skills required.'
    },
    category: 'volunteer',
    registrationLink: '#'
  }
];

// Helper function to get upcoming events
export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const upcoming = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return limit ? upcoming.slice(0, limit) : upcoming;
}

// Helper function to get past events
export function getPastEvents(limit?: number): Event[] {
  const now = new Date();
  const past = events
    .filter(event => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return limit ? past.slice(0, limit) : past;
}

// Helper function to format date
export function formatEventDate(dateString: string, language: 'zh' | 'en'): string {
  const date = new Date(dateString);

  if (language === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
