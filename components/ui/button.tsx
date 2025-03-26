import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export default function button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-semibold rounded-lg transition",
        variant === "default"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-gray-300 text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
