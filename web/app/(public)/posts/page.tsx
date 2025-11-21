import { Metadata } from 'next';
import Breadcrumb from '@/app/components/layout/Breadcrumb';
import PostGrid from '@/app/components/posts/PostGrid';

export const metadata: Metadata = {
  title: 'Bài viết hữu ích - DTech Vietnam',
  description: 'Các bài viết về thiết bị điện công nghiệp, tủ điện, tự động hóa',
};

interface PostsPageProps {
  searchParams: {
    page?: string;
  };
}

export default function PostsPage({ searchParams }: PostsPageProps) {
  const page = Number(searchParams.page) || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Bài viết', href: '/posts' },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Bài viết hữu ích</h1>

      <PostGrid page={page} />
    </div>
  );
}
