import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzprmsavgqeghpnmparg.supabase.co",
        pathname: "/storage/v1/object/public/staticimages/**",
      },
    ],
  },
};

export default nextConfig;
