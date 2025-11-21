'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import type { Post, PayloadResponse } from '@/app/types';
import { fetchJSON } from '@/app/lib/fetch-client';

interface PostGridProps {
  page: number;
}

export default function PostGrid({ page }: PostGridProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchJSON<PayloadResponse<Post>>(`/api/posts?page=${page}`);
        setPosts(data.docs || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Chưa có bài viết nào</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <a
              key={i}
              href={`?page=${i + 1}`}
              className={`px-4 py-2 rounded-lg ${
                i + 1 === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
