'use client';

import { useEffect, useState } from 'react';
import type { Serial } from '@/app/types';
import { fetchJSON } from '@/app/lib/fetch-client';
import SidebarSection from './SidebarSection';

export default function Sidebar() {
  const [serials, setSerials] = useState<Serial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer state

  useEffect(() => {
    const fetchSerials = async () => {
      try {
        const data = await fetchJSON<{ docs: Serial[] }>('/api/serials?depth=1');
        setSerials(data.docs || []);
      } catch (error) {
        console.error('Failed to fetch serials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSerials();
  }, []);

  if (loading) {
    return (
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Toggle Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          md:hidden fixed top-1/2 -translate-y-1/2 z-[60]
          w-10 h-10 bg-blue-600 bg-opacity-60 text-white rounded-full shadow-lg 
          border border-white
          transition-all duration-300
          flex items-center justify-center
          ${isOpen ? 'left-[240px]' : 'left-2'}
        `}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 
          transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40'}
          md:translate-x-0 md:z-auto
        `}
      >
        <div className="pt-16 md:pt-4 pb-4">
          {serials.length > 0 ? (
            serials.map((serial, index) => (
              <SidebarSection
                key={serial.id}
                serial={serial}
                defaultExpanded={index === 0} // First section expanded by default
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Không có danh mục
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
