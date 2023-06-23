import { HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({ onClick, children, disabled, bgColor, textColor, className, type }: Props) {
  return (
    <button
      className={twMerge("bg-primary p-5 rounded-xl text-bold text-white w-full disabled:bg-opacity-60", bgColor, textColor, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}>
      {children}
    </button>
  );
}