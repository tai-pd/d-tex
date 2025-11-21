import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/components/layout/Breadcrumb';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch post data from API
  return {
    title: `${slug} - DTech Vietnam Blog`,
    description: 'Blog post',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  // TODO: Fetch post from API
  // const post = await fetchPostBySlug(slug);
  // if (!post) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tin tức', href: '/posts' },
          { label: 'Bài viết', href: `/posts/${slug}` },
        ]}
      />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Bài viết: {slug}</h1>
        <div className="text-gray-600 mb-8">
          Ngày đăng: {new Date().toLocaleDateString('vi-VN')}
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">
            Nội dung bài viết sẽ được hiển thị ở đây sau khi kết nối với API.
          </p>
        </div>
      </article>
    </div>
  );
}
