import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/components/layout/Breadcrumb';
import PostContent from '@/app/components/posts/PostContent';

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
          { label: 'Post Title', href: `/posts/${slug}` },
        ]}
      />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Post Title</h1>
        <div className="text-gray-600 mb-8">
          Published on: {new Date().toLocaleDateString('vi-VN')}
        </div>
        <PostContent content={null} />
      </article>
    </div>
  );
}
