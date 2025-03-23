import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes dynamically.
 * Uses clsx and tailwind-merge to ensure class deduplication.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
