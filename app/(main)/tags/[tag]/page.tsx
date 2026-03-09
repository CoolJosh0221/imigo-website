import { notFound } from 'next/navigation';
import { getAllTags, getContentByTag } from '@/lib/content';
import BlogPageClient from '@/components/BlogPageClient';

export async function generateStaticParams() {
  const tags = getAllTags();

  return tags.map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged with "${decodedTag}" - iMigo`,
    description: `Browse all posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Get all tags to validate this one exists
  const allTags = getAllTags();
  if (!allTags.some(t => t.toLowerCase() === decodedTag.toLowerCase())) {
    notFound();
  }

  // Get content with this tag
  const posts = getContentByTag(decodedTag);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tag: {decodedTag}
          </h1>
          <p className="text-gray-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        <BlogPageClient
          initialPosts={posts}
          initialEvents={[]}
          showTabs={false}
        />
      </div>
    </div>
  );
}
