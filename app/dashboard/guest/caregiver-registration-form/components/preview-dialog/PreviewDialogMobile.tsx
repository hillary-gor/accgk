"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface PreviewDialogMobileProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PreviewDialogMobile({
  open,
  onClose,
  children,
}: PreviewDialogMobileProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dimmed background */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg overflow-y-auto max-h-[90vh] pb-8 hide-scrollbar"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top drag indicator */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="h-1.5 w-12 bg-gray-300 rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 z-50 rounded-full bg-gray-100 hover:bg-gray-200 p-1"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            {/* Scrollable content */}
            <div className="px-4 mt-3 space-y-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
