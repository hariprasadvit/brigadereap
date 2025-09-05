/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  distDir: 'build',
  experimental: {
    turbo: {},
  },
  dev: {
    // Allow Builder.io / remote preview origin to request dev assets
    allowedDevOrigins: [
      "https://ef910af432be4c7287bd0ef7bdf8aae6-a8481392-7440-4069-a1f2-a3be32.fly.dev"
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "brigadereap.com",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
      },
    ],
  },
};

export default nextConfig;
