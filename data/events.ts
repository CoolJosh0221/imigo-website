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
  tags?: string[]; // Optional tags for categorization
}

export const events: Event[] = [
  // Past events (to be displayed as blog posts)
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
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop',
    category: 'cultural',
    tags: ['cultural-exchange', 'lunar-new-year', 'festival', 'event']
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
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    category: 'training',
    tags: ['volunteer', 'training', 'workshop', 'online', 'event']
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
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop',
    category: 'community',
    tags: ['language-exchange', 'community', 'social', 'outdoor', 'event']
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
    tags: ['volunteer', 'medical', 'orientation', 'online', 'event']
  },
  {
    id: '5',
    title: {
      zh: '夏季烤肉社交活動',
      en: 'Summer BBQ Social Event'
    },
    date: '2025-07-20',
    time: '17:00 - 21:00',
    location: {
      zh: '新北市淡水河畔公園',
      en: 'Tamsui Riverside Park, New Taipei City'
    },
    description: {
      zh: '夏日烤肉聚會,讓移工朋友與台灣志工在輕鬆的氣氛中交流。享受美食、音樂和遊戲,建立跨文化友誼!',
      en: 'Summer BBQ gathering for migrant friends and Taiwanese volunteers to connect in a relaxed atmosphere. Enjoy food, music, games, and build cross-cultural friendships!'
    },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    category: 'community',
    tags: ['community', 'social', 'outdoor', 'food', 'event']
  },
  {
    id: '6',
    title: {
      zh: '中秋節慶祝活動',
      en: 'Mid-Autumn Festival Celebration'
    },
    date: '2025-09-15',
    time: '18:00 - 21:00',
    location: {
      zh: '台北市信義區香堤廣場',
      en: 'Xiangti Square, Xinyi District, Taipei'
    },
    description: {
      zh: '一起慶祝中秋節!品嚐月餅、提燈籠、賞月,體驗台灣傳統節日文化。歡迎所有移工朋友參加這個溫馨的團圓夜晚。',
      en: 'Celebrate Mid-Autumn Festival together! Enjoy mooncakes, lanterns, and moon gazing while experiencing traditional Taiwanese festival culture. All migrant friends welcome for this warm reunion evening.'
    },
    image: 'https://images.unsplash.com/photo-1569870499705-504209102861?w=800&h=400&fit=crop',
    category: 'cultural',
    tags: ['cultural-exchange', 'mid-autumn', 'festival', 'traditional', 'event']
  },
  // Upcoming events
  {
    id: '7',
    title: {
      zh: '年末感恩聚會',
      en: 'Year-End Thanksgiving Gathering'
    },
    date: '2025-12-15',
    time: '15:00 - 19:00',
    location: {
      zh: '台北市中正區NGO會館',
      en: 'NGO Hall, Zhongzheng District, Taipei'
    },
    description: {
      zh: '年終感恩聚會,回顧今年的服務成果,感謝所有志工與移工朋友的參與。現場將有精彩表演、美食分享與抽獎活動!',
      en: 'Year-end thanksgiving gathering to review this year\'s achievements and thank all volunteers and migrant friends. Features performances, food sharing, and lucky draws!'
    },
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
    category: 'community',
    registrationLink: '#',
    tags: ['community', 'celebration', 'thanksgiving', 'year-end', 'event']
  },
  {
    id: '8',
    title: {
      zh: '新年志工培訓課程',
      en: 'New Year Volunteer Training Course'
    },
    date: '2026-01-10',
    time: '09:00 - 17:00',
    location: {
      zh: '線上進行 (Zoom)',
      en: 'Online (Zoom)'
    },
    description: {
      zh: '新年度志工培訓課程開跑!學習最新的跨文化服務技巧、緊急應變能力,以及如何更好地支持移工朋友。完成課程可獲得證書。',
      en: 'New year volunteer training course begins! Learn the latest cross-cultural service skills, emergency response abilities, and how to better support migrant friends. Certificate awarded upon completion.'
    },
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    category: 'training',
    registrationLink: '#',
    tags: ['volunteer', 'training', 'education', 'online', 'event']
  },
  {
    id: '9',
    title: {
      zh: '春節前夕文化工作坊',
      en: 'Pre-Lunar New Year Cultural Workshop'
    },
    date: '2026-01-25',
    time: '14:00 - 17:00',
    location: {
      zh: '台中市文化中心',
      en: 'Taichung Cultural Center'
    },
    description: {
      zh: '在農曆新年前學習製作傳統春節裝飾、剪紙藝術、寫春聯等。與移工朋友分享你的家鄉新年傳統!',
      en: 'Learn to make traditional Lunar New Year decorations, paper cutting art, and write spring couplets before the festival. Share your hometown New Year traditions with migrant friends!'
    },
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
    category: 'cultural',
    registrationLink: '#',
    tags: ['cultural-exchange', 'workshop', 'lunar-new-year', 'arts-crafts', 'event']
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
