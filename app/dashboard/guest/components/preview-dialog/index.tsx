"use client";

import { useEffect, useState } from "react";
import { PreviewDialogDesktop } from "./PreviewDialogDesktop";
import { PreviewDialogMobile } from "./PreviewDialogMobile";

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function PreviewDialog({ open, onClose, children }: PreviewDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <PreviewDialogMobile open={open} onClose={onClose}>
        {children}
      </PreviewDialogMobile>
    );
  }

  return (
    <PreviewDialogDesktop open={open} onClose={onClose}>
      {children}
    </PreviewDialogDesktop>
  );
}
