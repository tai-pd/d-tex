'use client';

import { CONTACT_INFO } from '@/app/lib/constants';

export default function ContactWidget() {
  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
      {/* Facebook */}
      <a
        href={CONTACT_INFO.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
        aria-label="Chat Facebook"
        title="Chat Facebook"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Zalo */}
      <a
        href={CONTACT_INFO.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110"
        aria-label="Chat Zalo"
        title="Chat Zalo"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.97 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.969 18.627 0 12 0zm.5 14.5h-1v-1h1v1zm0-2h-1v-5h1v5z" />
        </svg>
      </a>

      {/* Phone */}
      <a
        href={`tel:${CONTACT_INFO.hotline}`}
        className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 animate-pulse"
        aria-label="Hotline"
        title={`Hotline: ${CONTACT_INFO.hotline}`}
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      </a>
    </div>
  );
}
