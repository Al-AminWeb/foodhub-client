import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
        unoptimized: true,
    },

    async rewrites() {
        return [
            {
                source: "/foodhub-api/auth/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
            },
        ];
    },
};

export default nextConfig;
