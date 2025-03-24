import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export default function Label({ className = "", ...props }: LabelProps) {
  return (
    <label className={`block font-medium text-gray-700 ${className}`} {...props} />
  );
}
