import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // هذا يعطل التحقق من ESLint عند البناء
  },
};

export default nextConfig;
