type Lang = 'en' | 'zh';

const t: Record<string, Record<Lang, string>> = {
  // Login
  'login.title': { en: 'iMigo Admin', zh: 'iMigo 管理後台' },
  'login.subtitle': { en: 'Sign in to manage content', zh: '登入以管理內容' },
  'login.password': { en: 'Password', zh: '密碼' },
  'login.placeholder': { en: 'Enter admin password', zh: '請輸入管理員密碼' },
  'login.signing_in': { en: 'Signing in...', zh: '登入中...' },
  'login.sign_in': { en: 'Sign In', zh: '登入' },
  'login.invalid': { en: 'Invalid password', zh: '密碼錯誤' },
  'login.required': { en: 'Password is required', zh: '請輸入密碼' },

  // Sidebar
  'nav.dashboard': { en: 'Dashboard', zh: '儀表板' },
  'nav.posts': { en: 'Blog Posts', zh: '部落格文章' },
  'nav.events': { en: 'Events', zh: '活動' },
  'nav.view_site': { en: 'View Site', zh: '瀏覽網站' },
  'nav.sign_out': { en: 'Sign Out', zh: '登出' },

  // Dashboard
  'dashboard.title': { en: 'Dashboard', zh: '儀表板' },
  'dashboard.posts': { en: 'Blog Posts', zh: '部落格文章' },
  'dashboard.events': { en: 'Events', zh: '活動' },
  'dashboard.manage_posts': { en: 'Manage Posts', zh: '管理文章' },
  'dashboard.manage_events': { en: 'Manage Events', zh: '管理活動' },
  'dashboard.how_title': { en: 'How it works', zh: '運作方式' },
  'dashboard.drafts': { en: 'drafts', zh: '草稿' },
  'dashboard.how_1': { en: 'Content is stored in a Turso (SQLite) database.', zh: '內容儲存在 Turso（SQLite）資料庫中。' },
  'dashboard.how_2': { en: 'Creating or editing content saves instantly to the database.', zh: '建立或編輯內容會即時儲存到資料庫。' },
  'dashboard.how_3': { en: 'Published content is live immediately — no redeployment needed.', zh: '已發佈的內容會即時上線，無需重新部署。' },
  'dashboard.how_4': { en: 'Images are stored in Vercel Blob storage.', zh: '圖片儲存在 Vercel Blob 儲存空間。' },

  // Posts
  'posts.title': { en: 'Blog Posts', zh: '部落格文章' },
  'posts.new': { en: 'New Post', zh: '新增文章' },
  'posts.empty': { en: 'No blog posts yet. Create your first one!', zh: '尚無部落格文章，建立第一篇吧！' },
  'posts.new_title': { en: 'New Blog Post', zh: '新增部落格文章' },
  'posts.edit_title': { en: 'Edit Blog Post', zh: '編輯部落格文章' },

  // Events
  'events.title': { en: 'Events', zh: '活動' },
  'events.new': { en: 'New Event', zh: '新增活動' },
  'events.empty': { en: 'No events yet. Create your first one!', zh: '尚無活動，建立第一個吧！' },
  'events.new_title': { en: 'New Event', zh: '新增活動' },
  'events.edit_title': { en: 'Edit Event', zh: '編輯活動' },

  // Common actions
  'common.edit': { en: 'Edit', zh: '編輯' },
  'common.delete': { en: 'Delete', zh: '刪除' },
  'common.cancel': { en: 'Cancel', zh: '取消' },
  'common.saving': { en: 'Saving...', zh: '儲存中...' },
  'common.deleting': { en: 'Deleting...', zh: '刪除中...' },
  'common.create_post': { en: 'Create Post', zh: '建立文章' },
  'common.update_post': { en: 'Update Post', zh: '更新文章' },
  'common.create_event': { en: 'Create Event', zh: '建立活動' },
  'common.update_event': { en: 'Update Event', zh: '更新活動' },
  'common.error': { en: 'Something went wrong', zh: '發生錯誤' },
  'common.publish': { en: 'Publish', zh: '發佈' },
  'common.unpublish': { en: 'Unpublish', zh: '取消發佈' },
  'common.draft': { en: 'Draft', zh: '草稿' },
  'common.published': { en: 'Published', zh: '已發佈' },

  // Editor fields
  'editor.metadata': { en: 'Metadata', zh: '中繼資料' },
  'editor.event_details': { en: 'Event Details', zh: '活動詳情' },
  'editor.post_id': { en: 'Post ID (number)', zh: '文章 ID（數字）' },
  'editor.event_id': { en: 'Event ID (number)', zh: '活動 ID（數字）' },
  'editor.slug': { en: 'Slug', zh: '網址代稱' },
  'editor.author': { en: 'Author', zh: '作者' },
  'editor.date': { en: 'Date', zh: '日期' },
  'editor.time': { en: 'Time', zh: '時間' },
  'editor.category': { en: 'Category', zh: '分類' },
  'editor.tags': { en: 'Tags (comma-separated)', zh: '標籤（以逗號分隔）' },
  'editor.registration_link': { en: 'Registration Link', zh: '報名連結' },
  'editor.featured_image': { en: 'Featured Image', zh: '精選圖片' },
  'editor.upload_image': { en: 'Upload Image', zh: '上傳圖片' },
  'editor.uploading': { en: 'Uploading...', zh: '上傳中...' },
  'editor.or_paste_url': { en: 'or paste a URL below', zh: '或在下方貼上網址' },
  'editor.title': { en: 'Title', zh: '標題' },
  'editor.excerpt': { en: 'Excerpt', zh: '摘要' },
  'editor.location': { en: 'Location', zh: '地點' },
  'editor.description': { en: 'Description', zh: '說明' },
  'editor.content': { en: 'Content (Markdown)', zh: '內容（Markdown）' },
  'editor.preview': { en: 'Preview', zh: '預覽' },
  'editor.hide_preview': { en: 'Hide Preview', zh: '隱藏預覽' },
  'editor.preview_empty': { en: 'Start typing to see preview...', zh: '開始輸入以查看預覽...' },
  'editor.required': { en: 'ID, slug, and titles (EN & ZH) are required', zh: 'ID、網址代稱及標題（英文和中文）為必填' },
  'editor.image_type_error': { en: 'Please select an image file', zh: '請選擇圖片檔案' },
  'editor.image_size_error': { en: 'Image must be under 4.5MB', zh: '圖片必須小於 4.5MB' },
  'editor.upload_failed': { en: 'Upload failed', zh: '上傳失敗' },
  'editor.status': { en: 'Status', zh: '狀態' },

  // Delete dialog
  'delete.confirm': { en: 'This will remove both EN and ZH files from the repository. This action cannot be undone.', zh: '這將從存放庫中移除英文和中文檔案。此操作無法復原。' },
};

export function ta(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? key;
}

/** Convert gray-matter date (may be Date object) to YYYY-MM-DD string */
export function toDateString(val: unknown): string {
  if (val instanceof Date) return val.toISOString().split('T')[0];
  return String(val || '');
}
