import "../foodhub-client/.env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows ALL domains
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
        unoptimized: true, // IMPORTANT: Disables Next.js optimization for external images
    },
};

export default nextConfig;