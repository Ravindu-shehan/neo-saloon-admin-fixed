import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: path.resolve(__dirname), // silences the package-lock.json warning
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: "http://localhost:3000/api/:path*", // change to your backend's real URL
      },
    ];
  },
};

export default nextConfig;
