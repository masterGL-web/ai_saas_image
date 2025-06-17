import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // هذا يعطل التحقق من ESLint عند البناء
  },
};

export default nextConfig;
