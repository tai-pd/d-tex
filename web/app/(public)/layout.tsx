import type { Metadata } from 'next';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import ContactWidget from '@/app/components/ui/ContactWidget';
import Sidebar from '@/app/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'DTech Vietnam - Điện Công Nghiệp | Tủ Điện | Tự Động Hóa',
  description: 'Cung cấp thiết bị điện công nghiệp chính hãng: LS, Mitsubishi, Schneider, ABB, Siemens, Fuji, Samwha, Idec, Omron',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen pt-0 md:pt-0">
          {children}
        </main>
      </div>
      <Footer />
      <ContactWidget />
    </>
  );
}
