import { LabelHTMLAttributes } from "react";

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`block font-medium text-gray-700 ${className}`}
      {...props}
    />
  );
}
