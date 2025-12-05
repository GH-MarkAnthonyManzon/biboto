// next.config.ts
// updated 11:58 am 12/5/25 TO ADD PLAYWRIGHT SUPPORT


import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node', 'playwright'], // Added playwright
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' ,
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add webpack config for Playwright (optional but recommended)
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark playwright as external for server-side rendering
      config.externals = [...(config.externals || []), 'playwright'];
    }
    return config;
  },
};

export default nextConfig;