import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname,
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  }
};

export default nextConfig;
