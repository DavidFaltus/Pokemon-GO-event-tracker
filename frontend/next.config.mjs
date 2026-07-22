/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_PUBLIC_BUILD_TARGET === 'export';

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'img.pokemondb.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.leekduck.com' },
    ],
  },
};

export default nextConfig;
