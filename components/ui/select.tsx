import { SelectHTMLAttributes, OptionHTMLAttributes, ReactNode } from "react";
import clsx from "clsx"; // Optional: Helps merge class names dynamically

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

export const select = ({ children, className, ...props }: SelectProps) => {
  return (
    <select
      className={clsx(
        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

interface SelectItemProps extends OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: ReactNode;
}

export const SelectItem = ({ value, children, ...props }: SelectItemProps) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};
