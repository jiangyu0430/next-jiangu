import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
    ],
  },
}

export default nextConfig
