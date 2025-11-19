# Amplitude Analytics Setup Guide

This guide will help you set up Amplitude analytics for tracking user behavior across your website and LINE bot.

## Table of Contents
1. [Create Amplitude Account](#1-create-amplitude-account)
2. [Get API Key](#2-get-api-key)
3. [Configure Environment Variables](#3-configure-environment-variables)
4. [Website Tracking (Already Implemented)](#4-website-tracking-already-implemented)
5. [LINE Bot Integration](#5-line-bot-integration)
6. [Viewing Analytics Dashboard](#6-viewing-analytics-dashboard)
7. [Custom Events and Properties](#7-custom-events-and-properties)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Create Amplitude Account

1. Go to [https://amplitude.com/](https://amplitude.com/)
2. Click **"Get Started"** or **"Sign Up"**
3. Choose the **Free Plan** (10 million events/month - perfect for your needs)
4. Create your account using email or Google sign-in
5. Complete the onboarding questionnaire

---

## 2. Get API Key

1. After logging in, you'll be prompted to create a project
2. Name your project: **"iMigo Website & LINE Bot"**
3. Select your platform: **"Web"**
4. Once created, navigate to **Settings** → **Projects** → **[Your Project Name]**
5. Find the **API Key** under **Project Settings**
6. Copy this key - you'll need it for the next step

---

## 3. Configure Environment Variables

### For the Website:

1. Open your `.env.local` file in the root of the project
2. Replace the demo value with your real API key:

```env
NEXT_PUBLIC_AMPLITUDE_API_KEY=your_actual_amplitude_api_key_here
```

3. Save the file
4. Restart your development server:
```bash
npm run dev
```

### For Production (Vercel/Netlify):

1. Go to your hosting platform's dashboard
2. Navigate to **Environment Variables** or **Settings**
3. Add the variable:
   - **Key**: `NEXT_PUBLIC_AMPLITUDE_API_KEY`
   - **Value**: Your Amplitude API key
4. Redeploy your application

---

## 4. Website Tracking (Already Implemented)

Your website is already configured to track the following events automatically:

### Automatic Tracking:
- ✅ **Page Views** - Every page visit
- ✅ **Sessions** - User session duration

### Custom Events Tracked:
- ✅ **Blog Post Read** - When a user opens a blog post
  - Properties: `post_id`, `post_title`, `post_category`, `language`

- ✅ **Contact Form Submitted** - When the contact form is sent
  - Properties: `status` (success/error), `language`

- ✅ **Language Switched** - When user changes language
  - Properties: `from_language`, `to_language`, `page`

- ✅ **Event Registration Clicked** - When "Register Now" is clicked
  - Properties: `event_id`, `event_title`, `event_category`, `language`

- ✅ **Tab Switched** - When tabs are switched on blog page
  - Properties: `tab_name` (all/events/blog), `language`

---

## 5. LINE Bot Integration

To track analytics from your LINE bot, you'll need to use Amplitude's HTTP API.

### Installation (Node.js LINE Bot):

```bash
npm install @amplitude/analytics-node
```

### Implementation Example:

```javascript
// In your LINE bot code
const { init, track } = require('@amplitude/analytics-node');

// Initialize Amplitude (do this once when your bot starts)
init('YOUR_AMPLITUDE_API_KEY');

// Track when a user sends a question
async function handleUserMessage(userId, messageText, userProfile) {
  // Classify the question
  const questionCategory = classifyQuestion(messageText);

  // Track the event
  track('Question Received', {
    user_id: userId,
    question_category: questionCategory, // e.g., 'medical', 'legal', 'visa'
    language: detectLanguage(messageText),
    user_country: userProfile.country,
    message_length: messageText.length,
    source: 'line_bot'
  }, {
    user_id: userId
  });
}

// Track when bot sends a response
async function sendBotResponse(userId, responseType, confidenceScore) {
  track('Response Sent', {
    user_id: userId,
    response_type: responseType, // 'ai_generated', 'template', 'human_handoff'
    confidence_score: confidenceScore,
    response_time_ms: Date.now() - startTime,
    source: 'line_bot'
  }, {
    user_id: userId
  });
}

// Track user satisfaction
async function handleFeedback(userId, rating, questionCategory) {
  track('Feedback Received', {
    user_id: userId,
    rating: rating, // 1-5 stars
    question_category: questionCategory,
    source: 'line_bot'
  }, {
    user_id: userId
  });
}
```

### Question Classification Example:

```javascript
function classifyQuestion(text) {
  const keywords = {
    medical: ['病', '醫院', '看病', 'doctor', 'hospital', 'sick', 'medicine'],
    legal: ['法律', '合同', '工資', 'legal', 'contract', 'salary', 'rights'],
    visa: ['簽證', '居留', 'visa', 'permit', 'immigration'],
    transport: ['公車', '捷運', 'bus', 'MRT', 'train', 'taxi'],
    housing: ['房子', '租房', 'house', 'rent', 'apartment'],
    language: ['中文', '學習', 'Chinese', 'learn', 'class'],
    general: []
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => text.includes(word))) {
      return category;
    }
  }

  return 'general';
}

function detectLanguage(text) {
  // Simple language detection
  const chineseChars = /[\u4e00-\u9fa5]/;
  return chineseChars.test(text) ? 'zh' : 'en';
}
```

---

## 6. Viewing Analytics Dashboard

### Accessing Your Dashboard:

1. Log in to [https://analytics.amplitude.com/](https://analytics.amplitude.com/)
2. Select your project: **"iMigo Website & LINE Bot"**

### Key Dashboards to Create:

#### Dashboard 1: Website Activity
- **Page Views Over Time** - Line chart
- **Most Read Blog Posts** - Bar chart
- **Language Preference** - Pie chart (zh vs en)
- **Contact Form Success Rate** - Number (successful / total)

#### Dashboard 2: LINE Bot Performance
- **Questions by Category** - Pie chart
  - Filter by `question_category`

- **Daily Questions** - Line chart
  - Event: "Question Received"

- **Average Response Time** - Number
  - Event: "Response Sent", measure: `response_time_ms`

- **User Satisfaction** - Bar chart
  - Event: "Feedback Received", group by `rating`

#### Dashboard 3: Cross-Platform Insights
- **Website vs LINE Bot Traffic** - Stacked bar chart
  - Filter by `source` property

- **Language Distribution Across Platforms** - Grouped bar chart

- **Most Popular Event Categories** - Bar chart
  - Combine website event clicks + LINE bot questions

### Creating a Chart:

1. Click **"Create Chart"** in Amplitude
2. Choose event: e.g., "Blog Post Read"
3. Select visualization type: Line, Bar, Pie, etc.
4. Add filters: e.g., `language = zh`
5. Group by: e.g., `post_category`
6. Save to dashboard

---

## 7. Custom Events and Properties

### Adding New Events:

#### Website (React/Next.js):
```typescript
import { analytics } from '@/lib/analytics';

// Simple event
analytics.track('Button Clicked', {
  button_name: 'Join Volunteer',
  page: '/contact'
});

// With custom properties
analytics.track('Newsletter Signup', {
  email_domain: user.email.split('@')[1],
  referral_source: 'blog_post',
  language: language
});
```

#### LINE Bot:
```javascript
track('Custom Event', {
  user_id: userId,
  custom_property: 'value',
  source: 'line_bot'
}, {
  user_id: userId
});
```

### Recommended Additional Events:

**Website:**
- Social media link clicks
- Newsletter signups
- Volunteer application started/completed
- Resource downloads (PDFs, guides)
- Video plays

**LINE Bot:**
- Session duration
- Commands used (e.g., `/help`, `/translate`)
- Link clicks in bot messages
- User retention (returning users)
- Error rates (failed responses)

---

## 8. Troubleshooting

### Issue: No events showing in Amplitude

**Solutions:**
1. Check that you've replaced the demo API key with your real key
2. Verify the API key is correct (no extra spaces)
3. Clear browser cache and reload
4. Check browser console for errors (F12 → Console)
5. Wait 1-2 minutes - Amplitude can have slight delays

### Issue: Events tracked but no properties

**Solutions:**
1. Ensure you're passing properties as the second argument
2. Check that property values are not `undefined` or `null`
3. Verify property names don't have special characters

### Issue: LINE bot events not appearing

**Solutions:**
1. Confirm `@amplitude/analytics-node` is installed
2. Check that `init()` is called before `track()`
3. Verify your bot server has internet access
4. Use the same API key as your website

### Issue: Duplicate events

**Solutions:**
1. Check if Amplitude is initialized multiple times
2. Remove duplicate `analytics.track()` calls
3. Use React's `useEffect` with proper dependencies

---

## Free Tier Limits

**Amplitude Free Plan:**
- ✅ 10 million events per month
- ✅ Unlimited users
- ✅ 1 year of data retention
- ✅ Real-time analytics
- ✅ All core charts
- ✅ 5 team members

This should be more than enough for your non-profit use case!

---

## Example Questions You Can Answer

With Amplitude set up, you can answer questions like:

✅ "How many medical questions were asked in Chinese this month?"
- Filter: `question_category = medical` AND `language = zh`

✅ "What's the most popular blog post category?"
- Event: "Blog Post Read", group by: `post_category`

✅ "Which events get the most registration clicks?"
- Event: "Event Registration Clicked", group by: `event_title`

✅ "What percentage of users prefer Traditional Chinese?"
- Event: "Language Switched" OR "Page View", group by: `language`

✅ "How many contact forms were successfully sent this week?"
- Event: "Contact Form Submitted", filter: `status = success`

✅ "What's the average response time for the LINE bot?"
- Event: "Response Sent", measure: average of `response_time_ms`

---

## Need Help?

- **Amplitude Documentation**: [https://www.docs.developers.amplitude.com/](https://www.docs.developers.amplitude.com/)
- **Amplitude Community**: [https://community.amplitude.com/](https://community.amplitude.com/)
- **LINE Messaging API**: [https://developers.line.biz/](https://developers.line.biz/)

---

## Next Steps

1. ✅ Create Amplitude account
2. ✅ Get API key
3. ✅ Add to `.env.local`
4. ✅ Restart dev server
5. ✅ Test by clicking around your website
6. ✅ Check Amplitude dashboard for events
7. ✅ Integrate LINE bot tracking
8. ✅ Create custom dashboards
9. ✅ Share insights with your team!

Good luck tracking your impact! 🎉
