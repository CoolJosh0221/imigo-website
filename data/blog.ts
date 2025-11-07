// Easy-to-update blog post data
// Add new posts by copying the structure below

export interface BlogPost {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  excerpt: {
    zh: string;
    en: string;
  };
  content: {
    zh: string;
    en: string;
  };
  author: string;
  date: string; // ISO format: YYYY-MM-DD
  category: 'news' | 'story' | 'announcement' | 'guide';
  image?: string; // Optional featured image URL
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: {
      zh: 'iMigo 志工平台正式啟動!',
      en: 'iMigo Volunteer Platform Officially Launched!'
    },
    excerpt: {
      zh: '經過半年的籌備,iMigo 志工平台終於正式上線。我們期待透過科技與溫度,為台灣的移工朋友帶來更好的服務。',
      en: 'After six months of preparation, the iMigo volunteer platform is officially live. We look forward to bringing better services to migrant workers in Taiwan through technology and warmth.'
    },
    content: {
      zh: `# iMigo 志工平台正式啟動!

經過半年的籌備,iMigo 志工平台終於正式上線!這是一個由五位充滿熱情的高中生所創立的志工組織,我們致力於透過 AI 科技與志工服務,幫助來自世界各地的朋友更好地融入台灣生活。

## 我們的服務

1. **AI 智能助理** - 24/7 多語言 LINE 聊天機器人
2. **志工媒合平台** - 連結台灣青年志工與移工朋友
3. **多語資源中心** - 整合醫療、法律、交通等生活資訊
4. **文化交流活動** - 定期舉辦各類文化體驗活動

## 加入我們

如果你也想成為改變的力量,歡迎加入 iMigo 志工團隊!`,
      en: `# iMigo Volunteer Platform Officially Launched!

After six months of preparation, the iMigo volunteer platform is officially live! Founded by five passionate high school students, we are dedicated to helping friends from around the world integrate better into life in Taiwan through AI technology and volunteer services.

## Our Services

1. **AI Smart Assistant** - 24/7 multilingual LINE chatbot
2. **Volunteer Matching Platform** - Connecting Taiwanese youth volunteers with migrant friends
3. **Multilingual Resource Center** - Integrating medical, legal, transportation info
4. **Cultural Exchange Activities** - Regular cultural experience events

## Join Us

If you want to be a force for change, join the iMigo volunteer team!`
    },
    author: 'iMigo 團隊',
    date: '2025-01-15',
    category: 'announcement',
    tags: ['announcement', 'launch', 'about']
  },
  {
    id: '2',
    title: {
      zh: '志工心得分享:第一次陪同就醫的經驗',
      en: 'Volunteer Story: My First Medical Accompaniment Experience'
    },
    excerpt: {
      zh: '身為新加入的志工,第一次陪同移工朋友就醫讓我深刻體會到語言橋樑的重要性。這不只是翻譯,更是一份溫暖的陪伴。',
      en: 'As a new volunteer, my first medical accompaniment experience made me deeply appreciate the importance of language bridges. It\'s not just translation, but warm companionship.'
    },
    content: {
      zh: `# 第一次陪同就醫的經驗

我是 Amy,一名剛加入 iMigo 的大學生志工。上週,我第一次陪同來自印尼的 Sari 去看醫生。

## 準備工作

在出發前,我做了以下準備:
- 學習基本的醫療用語
- 了解 Sari 的症狀
- 準備相關的醫療翻譯 app

## 實際經驗

雖然有些緊張,但看到 Sari 安心的笑容,我知道這一切都值得了。醫生很有耐心,我們順利完成了看診。

## 感想

這次經驗讓我明白,志工服務不只是幫助別人,更是一個互相學習、成長的過程。`,
      en: `# My First Medical Accompaniment Experience

I'm Amy, a university student volunteer who just joined iMigo. Last week, I accompanied Sari from Indonesia to see a doctor for the first time.

## Preparation

Before departing, I prepared by:
- Learning basic medical terminology
- Understanding Sari's symptoms
- Preparing relevant medical translation apps

## The Experience

Although nervous, seeing Sari's relieved smile made it all worthwhile. The doctor was patient, and we successfully completed the consultation.

## Reflection

This experience taught me that volunteer service isn't just about helping others, it's a process of mutual learning and growth.`
    },
    author: 'Amy',
    date: '2025-01-20',
    category: 'story',
    tags: ['volunteer', 'story', 'medical']
  },
  {
    id: '3',
    title: {
      zh: '如何成為 iMigo 志工?完整指南',
      en: 'How to Become an iMigo Volunteer? Complete Guide'
    },
    excerpt: {
      zh: '想加入 iMigo 但不知道從何開始?這篇文章將帶你了解完整的志工申請流程和所需準備。',
      en: 'Want to join iMigo but don\'t know where to start? This article will guide you through the complete volunteer application process and requirements.'
    },
    content: {
      zh: `# 如何成為 iMigo 志工?

## 申請流程

1. **填寫申請表** - 告訴我們你的專長與興趣
2. **參加面談** - 與團隊成員深入交流
3. **志工培訓** - 學習服務技能與知識
4. **開始服務** - 正式成為 iMigo 志工

## 志工類型

### 線上志工
- LINE 翻譯與諮詢服務
- 資料整理與翻譯
- 社群媒體經營

### 實體志工
- 就醫陪伴與翻譯
- 文化交流活動協助
- 生活協助與導覽

## 開始申請

準備好了嗎?立即填寫申請表,加入我們的團隊!`,
      en: `# How to Become an iMigo Volunteer?

## Application Process

1. **Fill Application Form** - Tell us about your skills and interests
2. **Interview** - Deep exchange with team members
3. **Volunteer Training** - Learn service skills and knowledge
4. **Start Serving** - Officially become an iMigo volunteer

## Volunteer Types

### Online Volunteers
- LINE translation and consultation services
- Data organization and translation
- Social media management

### On-site Volunteers
- Medical accompaniment and translation
- Cultural exchange activity assistance
- Life assistance and guidance

## Start Applying

Ready? Fill out the application form now and join our team!`
    },
    author: 'iMigo 團隊',
    date: '2025-01-25',
    category: 'guide',
    tags: ['guide', 'volunteer', 'howto']
  }
];

// Helper function to get recent posts
export function getRecentPosts(limit?: number): BlogPost[] {
  const sorted = [...blogPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

// Helper function to get posts by category
export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// Helper function to format date
export function formatBlogDate(dateString: string, language: 'zh' | 'en'): string {
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
