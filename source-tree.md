/ (repo root)
├── payload/ # Payload CMS app
│ ├── package.json
│ ├── tsconfig.json
│ ├── payload.config.ts # Main config (collections, db, uploads)
│ ├── collections/
│ │ ├── products.ts
│ │ ├── serials.ts
│ │ ├── categories.ts
│ │ ├── brands.ts
│ │ ├── pages.ts
│ │ └── globals/siteSettings.ts
│ └── migrations/ # Drizzle migration files (if dùng postgres)
│
├── web/ # Next.js frontend
│ ├── package.json
│ ├── next.config.js
│ ├── tsconfig.json
│ ├── public/
│ ├── pages/
│ │ ├── index.tsx
│ │ ├── products/[slug].tsx # product detail page
│ │ └── api/preview.ts # Next.js Preview Mode endpoint
│ ├── lib/
│ │ └── payload.ts # helper fetch functions
│ └── components/
│ └── ProductDetail.tsx
│
├── docker/ (optional)
│ └── Dockerfile.payload
│ └── Dockerfile.next
│
└── README.md
