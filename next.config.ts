import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 REJECTS (400) any quality not listed here — it does not fall back.
     * Must cover every `quality={...}` used in the app; see
     * `grep -rn "quality={" src`.
     */
    qualities: [60, 70, 75, 80, 85, 90, 95],
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
