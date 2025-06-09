import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        // hostname: 'api.moomkin.uz',
        hostname: 'test.moomkin.uz',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/uz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
