import { getPostById, getAllPostIds, getRelatedPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/BlogPostClient';

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({ id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  // Get related posts by shared tags
  const relatedPosts = getRelatedPosts(id, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
