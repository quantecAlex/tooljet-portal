// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained server at .next/standalone
  output: 'standalone',

  // Safe defaults
  reactStrictMode: true,

  // (optional) If you want Turbopack in dev only
  // experimental: { turbo: { } },
};

export default nextConfig;
