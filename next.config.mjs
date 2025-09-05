/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    turbo: false,
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
    ],
  },
};

export default nextConfig;
