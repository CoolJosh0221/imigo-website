import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import PostEditor from '@/components/admin/PostEditor';
import { updatePost } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await db.select().from(posts).where(eq(posts.id, Number(id))).get();
  if (!post) notFound();

  const initialData = {
    slug: post.slug,
    author: post.author,
    date: post.date,
    category: post.category,
    image: post.image || '',
    tags: JSON.parse(post.tags) as string[],
    status: post.status,
    en: {
      title: post.titleEn,
      excerpt: post.excerptEn,
      content: post.contentEn,
    },
    zh: {
      title: post.titleZh,
      excerpt: post.excerptZh,
      content: post.contentZh,
    },
  };

  async function handleUpdate(data: Parameters<typeof updatePost>[1]) {
    'use server';
    await updatePost(Number(id), data);
  }

  return <PostEditor mode="edit" initialData={initialData} onSubmit={handleUpdate} />;
}
