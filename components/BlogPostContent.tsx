'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPostContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        a: ({ node, ...props }) => <a className="text-orange-600 hover:underline" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-orange-500 pl-4 italic my-4" {...props} />
        ),
        code: ({ node, ...props }) => (
          <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
