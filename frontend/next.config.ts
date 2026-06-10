import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // 允许通过 IP 地址访问时 HMR 正常工作
  allowedDevOrigins: ['all'],
  async rewrites() {
    return [
      {
        source: '/api/book/:path*',
        destination: 'http://127.0.0.1:82/api/book/:path*',  // 你的 Flask 后端地址
      },
      {
        source: '/api/user/:path*',
        destination: 'http://127.0.0.1:82/api/user/:path*',  // 你的 Flask 后端地址
      },
    ]
  },
  
};

export default nextConfig;
