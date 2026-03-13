import { notFound } from 'next/navigation';
import { listContentFiles, getFileContent } from '@/lib/github';
import matter from 'gray-matter';
import { toDateString } from '@/lib/admin-i18n';
import PostEditor from '@/components/admin/PostEditor';
import { updatePost } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

async function getPostData(id: string) {
  const files = await listContentFiles('blog');
  const enFile = files.find((f) => f.name.startsWith(`${id}-`) && f.name.endsWith('.en.md'));
  const zhFile = files.find((f) => f.name.startsWith(`${id}-`) && f.name.endsWith('.zh.md'));

  if (!enFile || !zhFile) return null;

  const [enContent, zhContent] = await Promise.all([
    getFileContent(enFile.path),
    getFileContent(zhFile.path),
  ]);

  const enMatter = matter(enContent.content);
  const zhMatter = matter(zhContent.content);

  const slugMatch = enFile.name.match(/^\d+-(.+)\.en\.md$/);
  const slug = slugMatch ? slugMatch[1] : '';

  return {
    id,
    slug,
    author: String(enMatter.data.author || ''),
    date: toDateString(enMatter.data.date),
    category: String(enMatter.data.category || 'announcement'),
    image: String(enMatter.data.image || ''),
    tags: (enMatter.data.tags as string[]) || [],
    en: {
      title: String(enMatter.data.title || ''),
      excerpt: String(enMatter.data.excerpt || ''),
      content: enMatter.content,
    },
    zh: {
      title: String(zhMatter.data.title || ''),
      excerpt: String(zhMatter.data.excerpt || ''),
      content: zhMatter.content,
    },
    enSha: enContent.sha,
    zhSha: zhContent.sha,
    enPath: enFile.path,
    zhPath: zhFile.path,
  };
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostData(id);
  if (!post) notFound();

  const { enSha, zhSha, enPath, zhPath, ...initialData } = post;

  async function handleUpdate(data: Parameters<typeof updatePost>[0]) {
    'use server';
    await updatePost(data, enSha, zhSha, enPath, zhPath);
  }

  return <PostEditor mode="edit" initialData={initialData} onSubmit={handleUpdate} />;
}
