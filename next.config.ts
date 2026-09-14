import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Next 16 only honours qualities listed here; anything else falls back to 75. */
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
