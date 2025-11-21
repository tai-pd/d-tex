import Link from 'next/link';
import Image from 'next/image';
import Card from '@/app/components/ui/Card';
import type { Post } from '@/app/types';
import { formatDate, truncate } from '@/app/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = typeof post.featuredImage === 'object' && post.featuredImage?.url
    ? post.featuredImage.url
    : '/placeholder-post.jpg';

  return (
    <Link href={`/posts/${post.slug}`}>
      <Card hover className="h-full group overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(new Date(post.publishedAt))}
              </time>
            )}
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {truncate(post.excerpt, 150)}
            </p>
          )}

          {/* Read More */}
          <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-1">
            Đọc thêm
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
