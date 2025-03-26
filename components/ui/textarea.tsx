import { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  containerClass?: string;
  inputClass?: string;
};

export default function textarea({
  label,
  containerClass,
  inputClass,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className={twMerge("w-full", containerClass)}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <textarea
        className={twMerge(
          "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          inputClass,
          className
        )}
        {...props}
      />
    </div>
  );
}
