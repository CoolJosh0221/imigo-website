import Link from 'next/link';
import { getAllTags, getTagCounts } from '@/lib/content';

export const metadata = {
  title: 'All Tags - iMigo',
  description: 'Browse content by tags',
};

export default function TagsPage() {
  const tags = getAllTags();
  const tagCounts = getTagCounts();

  // Sort tags by count (descending)
  const sortedTags = tags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tags</h1>
          <p className="text-gray-600 mb-8">
            Browse all content by tags. Click on a tag to see related posts.
          </p>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-wrap gap-3">
              {sortedTags.map((tag) => {
                const count = tagCounts[tag] || 0;
                // Calculate size based on count for tag cloud effect
                const sizeClass = count >= 5 ? 'text-2xl' : count >= 3 ? 'text-xl' : 'text-lg';

                return (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 ${sizeClass}`}
                  >
                    <span>{tag}</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>

            {sortedTags.length === 0 && (
              <p className="text-gray-500 text-center py-8">No tags available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
