'use client';

import Link from 'next/link';

interface TagCloudProps {
  tags: string[];
  tagCounts?: Record<string, number>;
  onTagClick?: (tag: string) => void;
  selectedTag?: string;
}

export default function TagCloud({ tags, tagCounts = {}, onTagClick, selectedTag }: TagCloudProps) {
  if (tags.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No tags available
      </div>
    );
  }

  // Sort tags by count if available
  const sortedTags = [...tags].sort((a, b) => {
    const countA = tagCounts[a] || 0;
    const countB = tagCounts[b] || 0;
    return countB - countA;
  });

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map((tag) => {
        const count = tagCounts[tag] || 0;
        const isSelected = selectedTag === tag;

        // Calculate size based on count for tag cloud effect
        const getFontSize = () => {
          if (count >= 5) return 'text-base';
          if (count >= 3) return 'text-sm';
          return 'text-xs';
        };

        const baseClasses = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${getFontSize()}`;

        const colorClasses = isSelected
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-105'
          : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 border border-gray-200';

        if (onTagClick) {
          // Interactive button mode (for filtering)
          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`${baseClasses} ${colorClasses} hover:scale-105`}
            >
              <span>{tag}</span>
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        }

        // Link mode (for navigation)
        return (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className={`${baseClasses} ${colorClasses} hover:scale-105`}
          >
            <span>{tag}</span>
            {count > 0 && (
              <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
