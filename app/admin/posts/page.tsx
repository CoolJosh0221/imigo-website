import { db } from '@/lib/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import AdminPostList from './AdminPostList';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.date));

  const postList = allPosts.map((p) => ({
    id: p.id,
    title: p.titleEn,
    titleZh: p.titleZh,
    date: p.date,
    category: p.category,
    status: p.status,
  }));

  return <AdminPostList posts={postList} />;
}
