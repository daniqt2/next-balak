import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Contentful images bypass Vercel's optimizer entirely (see the loader);
     * only local /public files still go through it.
     */
    loaderFile: './src/lib/image-loader.js',

    /**
     * Next 16 REJECTS (400) any quality not listed here — it does not fall back.
     * Kept to one value (plus Next's 75 default) so each image has at most two
     * variants instead of six.
     */
    qualities: [75, 80],

    /**
     * Every extra width is another variant, and every variant is bandwidth.
     * Capped at 1280: a full-bleed hero is 316KB there vs 756KB at 1920, and
     * it sits behind a dark gradient and text.
     */
    deviceSizes: [640, 828, 1080, 1280],
    imageSizes: [128, 256, 384],

    /** 31 days. At the 4h default, every variant was rewritten ~6x a day. */
    minimumCacheTTL: 2678400,

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
