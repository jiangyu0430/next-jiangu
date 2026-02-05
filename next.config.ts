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
  // 临时跳转（不用了就删掉整个 redirects，再重新部署）
  async redirects() {
    return [
      {
        // 访问 /123 时跳转到目标网站
        source: '/123',
        destination:
          'https://sg0tx5juz1.feishu.cn/wiki/CNZewayDriPk2CkxC9rcRbsrnUO',
        // 临时跳转：307（不要改成 true）
        permanent: false,
      },
    ]
  },
}

export default nextConfig
