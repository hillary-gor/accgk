import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzprmsavgqeghpnmparg.supabase.co",
        pathname: "/storage/v1/object/public/staticimages/**",
      },
      {
        protocol: "https",
        hostname: "rzprmsavgqeghpnmparg.supabase.co",
        pathname: "/storage/v1/object/public/institution-logos/**",
      },
      {
        protocol: "https",
        hostname: "rzprmsavgqeghpnmparg.supabase.co",
        pathname: "/storage/v1/object/public/assets/**",
      },
      {
        protocol: "https",
        hostname: "rzprmsavgqeghpnmparg.supabase.co",
        pathname: "/storage/v1/object/public/caregiver-documents/**",
      },
      {
        protocol: "https",
        hostname: "rzprmsavgqeghpnmparg.supabase.co",
        pathname: "/storage/v1/object/public/institution-documents/**",
      },
    ],
  },
};

export default nextConfig;
