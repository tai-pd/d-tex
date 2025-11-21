import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/components/layout/Breadcrumb';
import ProductHeader from '@/app/components/product/ProductHeader';
import ProductGallery from '@/app/components/product/ProductGallery';
import ProductDescription from '@/app/components/product/ProductDescription';
import ProductSpecs from '@/app/components/product/ProductSpecs';
import DownloadSection from '@/app/components/product/DownloadSection';
import RelatedProducts from '@/app/components/product/RelatedProducts';

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { product } = await params;
  // TODO: Fetch product data from API
  return {
    title: `${product} - DTech Vietnam`,
    description: 'Product details',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, product } = await params;
  
  // TODO: Fetch product from API
  // const productData = await fetchProductBySlug(product);
  // if (!productData) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Category', href: `/${category}` },
          { label: 'Product Name', href: `/${category}/${product}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={[]} />
        <div>
          <ProductHeader 
            name="Product Name"
            code="PROD-001"
            brand="LS"
          />
          <ProductSpecs specifications={[]} />
          <DownloadSection 
            catalog={null}
            priceList={null}
          />
        </div>
      </div>

      <ProductDescription content={null} />

      <RelatedProducts categoryId="" currentProductId="" />
    </div>
  );
}
