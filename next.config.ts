import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
