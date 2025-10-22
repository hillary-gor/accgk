"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center space-x-2 text-xs text-gray-500 mt-auto">
      <span className="font-semibold whitespace-nowrap">
        © {new Date().getFullYear()} Glirm
      </span>
      <span className="text-neutral-500">•</span>
      <div className="flex items-center gap-1">
        <span className="text-sm text-neutral-500">Powered by</span>
        <Link
          href="https://wa.me/254113015069"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Powered by Surge"
          className="hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/Layer_1 (2).png"
            alt="Surge Logo"
            width={80}
            height={24}
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
