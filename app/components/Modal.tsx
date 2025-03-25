"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

export default function Modal({
  isOpen,
  message,
  type = "info",
  duration = 3000,
}: ModalProps) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        setShow(false); // Close modal after duration
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  if (!show) return null;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-fade-in-out">
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${typeStyles[type]}`}
          >
            {type === "success" && "✅"}
            {type === "error" && "❌"}
            {type === "info" && "ℹ️"}
          </div>

          <p className="mt-4 text-lg font-medium text-gray-900">{message}</p>

          <button
            onClick={() => setShow(false)}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
