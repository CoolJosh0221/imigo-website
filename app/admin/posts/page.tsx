import { listContentFiles, getFileContent } from '@/lib/github';
import matter from 'gray-matter';
import { toDateString } from '@/lib/admin-i18n';
import AdminPostList from './AdminPostList';

export const dynamic = 'force-dynamic';

export interface PostSummary {
  id: string;
  title: string;
  date: string;
  category: string;
  enPath: string;
  zhPath: string;
  enSha: string;
  zhSha: string;
}

async function getPosts(): Promise<PostSummary[]> {
  const files = await listContentFiles('blog');
  const enFiles = files.filter((f) => f.name.endsWith('.en.md'));

  const posts: PostSummary[] = [];

  for (const enFile of enFiles) {
    const match = enFile.name.match(/^(\d+)-/);
    if (!match) continue;

    const id = match[1];
    const zhFile = files.find((f) => f.name.startsWith(`${id}-`) && f.name.endsWith('.zh.md'));
    if (!zhFile) continue;

    try {
      const enContent = await getFileContent(enFile.path);
      const { data } = matter(enContent.content);

      posts.push({
        id,
        title: String(data.title || enFile.name),
        date: toDateString(data.date),
        category: String(data.category || ''),
        enPath: enFile.path,
        zhPath: zhFile.path,
        enSha: enContent.sha,
        zhSha: zhFile.sha,
      });
    } catch {
      // Skip files that fail to parse
    }
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export default async function AdminPostsPage() {
  let posts: PostSummary[] = [];
  let error = '';

  try {
    posts = await getPosts();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load posts';
  }

  return <AdminPostList posts={posts} error={error} />;
}
