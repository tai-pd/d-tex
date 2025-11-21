'use client';

import { useState } from 'react';
import type { Serial, Category } from '@/app/types';
import SidebarItem from './SidebarItem';

interface SidebarSectionProps {
  serial: Serial;
  defaultExpanded?: boolean;
}

export default function SidebarSection({ serial, defaultExpanded = false }: SidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const categories = Array.isArray(serial.categories) 
    ? serial.categories.filter((cat): cat is Category => typeof cat === 'object')
    : [];

  return (
    <div className="border-b border-gray-200">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-purple-50 hover:bg-purple-100 transition-colors"
      >
        <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          {serial.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Categories List */}
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {categories.length > 0 ? (
          <div className="bg-white">
            {categories.map((category) => (
              <SidebarItem key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">
            Không có danh mục
          </div>
        )}
      </div>
    </div>
  );
}
