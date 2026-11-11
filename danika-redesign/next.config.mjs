/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Original-site photos are loaded remotely until you run `npm run images:fetch`
    // and set NEXT_PUBLIC_LOCAL_IMAGES=1 (see README).
    remotePatterns: [
      { protocol: 'https', hostname: 'danikaplumbing.com', pathname: '/wp-content/uploads/**' },
    ],
  },
};
export default nextConfig;
