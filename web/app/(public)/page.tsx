import Hero from '@/app/components/home/Hero';
import FeaturedProducts from '@/app/components/home/FeaturedProducts';
import BrandShowcase from '@/app/components/home/BrandShowcase';
import AboutSection from '@/app/components/home/AboutSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandShowcase />
      <AboutSection />
    </>
  );
}
