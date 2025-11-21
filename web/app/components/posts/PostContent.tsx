import Image from 'next/image';
import type { Media } from '@/app/types';
import { formatDate } from '@/app/lib/utils';

interface PostContentProps {
  title: string;
  publishedAt: string;
  author?: string;
  featuredImage?: Media | string | null;
  content: any;
}

export default function PostContent({
  title,
  publishedAt,
  author,
  featuredImage,
  content,
}: PostContentProps) {
  const imageUrl = typeof featuredImage === 'object' && featuredImage?.url
    ? featuredImage.url
    : null;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        
        <div className="flex items-center gap-3 text-gray-600">
          <time dateTime={publishedAt}>
            {formatDate(new Date(publishedAt))}
          </time>
          {author && (
            <>
              <span>•</span>
              <span>Bởi {author}</span>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {/* TODO: Render rich text content from Payload CMS */}
        {content ? (
          <div>Rich text content will be rendered here</div>
        ) : (
          <p className="text-gray-600">Nội dung bài viết sẽ được hiển thị ở đây.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-2">Chia sẻ bài viết:</p>
            <div className="flex gap-3">
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.97 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.969 18.627 0 12 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
