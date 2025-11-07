// Format blog date - can be used on both client and server
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
