/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_PUBLIC_BUILD_TARGET === 'export';

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'export' } : {}),
  // Enable gzip/brotli compression for server-rendered responses
  compress: true,
  images: {
    // unoptimized: required for static export (Firebase Hosting serves raw files)
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'img.pokemondb.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.leekduck.com' },
    ],
  },
  experimental: {
    // Tree-shake lucide-react — only import icons actually used (reduces bundle size)
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure proper output file tracing for Cloud Run deployment
  ...(isStaticExport ? {} : {
    output: undefined,
  }),
};

export default nextConfig;

