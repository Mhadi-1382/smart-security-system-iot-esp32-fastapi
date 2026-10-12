import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: `${process.env.NEXT_PUBLIC_API}`,
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
