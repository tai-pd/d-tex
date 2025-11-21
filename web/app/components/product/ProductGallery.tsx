'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Media } from '@/app/types';

interface ProductGalleryProps {
  images: (Media | string)[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];
  const selectedUrl = typeof selectedImage === 'object' && selectedImage?.url
    ? selectedImage.url
    : '/placeholder-product.jpg';

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={selectedUrl}
          alt="Product image"
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => {
            const imageUrl = typeof image === 'object' && image?.url
              ? image.url
              : '/placeholder-product.jpg';

            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === selectedIndex ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
