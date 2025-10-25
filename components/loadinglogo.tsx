"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface LoadingLogoProps {
  size?: number;
  message?: string;
  loop?: boolean;
}

export default function LoadingLogo({
  size = 96,
  message = "Loading...",
  loop = true,
}: LoadingLogoProps) {
  const controls = useAnimation();
  const logoSrc = "/favicon.ico";

  useEffect(() => {
    const animateSpin = async () => {
      while (true) {
        // accelerate
        await controls.start({
          rotate: 360,
          transition: { duration: 0.8, ease: "easeIn" },
        });

        // decelerate
        await controls.start({
          rotate: 720,
          transition: { duration: 2, ease: "easeOut" },
        });

        if (!loop) break;

        // reset back to 0° for the next cycle
        await controls.set({ rotate: 0 });
      }
    };

    animateSpin();
  }, [controls, loop]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <motion.div animate={controls}>
        <Image
          src={logoSrc}
          alt="Loading logo"
          width={size}
          height={size}
          priority
          className="rounded-full select-none"
        />
      </motion.div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}
