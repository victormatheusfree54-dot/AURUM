/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NEXT_OUTPUT_EXPORT === "1" ? { output: "export" } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
