import type { NextConfig } from 'next';
import redirects from './src/config/redirects.json';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: [
    '@prisma/adapter-mariadb',
    'mariadb',
    'bullmq',
    'ioredis',
    'bcryptjs',
  ],
  experimental: {
    optimizePackageImports: [
      '@tiptap/react',
      '@tiptap/starter-kit',
      '@tiptap/extension-link',
      '@tiptap/extension-underline',
      '@tiptap/extension-text-align',
      '@tiptap/extension-image',
      '@tiptap/extension-highlight',
      '@tiptap/extension-table',
      'sweetalert2',
      'zod',
      'next-auth',
    ],
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return (redirects as Array<{ from: string; to: string }>).map((rule) => ({
      source: rule.from,
      destination: rule.to,
      permanent: true,
    }));
  },
};

export default nextConfig;
