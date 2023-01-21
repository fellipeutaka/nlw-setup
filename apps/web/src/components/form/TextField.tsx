import { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";

import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

type RootProps = HTMLAttributes<HTMLDivElement>;

export const Root = ({ className, ...props }: RootProps) => (
  <div
    className={twMerge(
      "flex items-center gap-3 p-4 rounded-lg bg-zinc-800",
      className
    )}
    {...props}
  />
);

type TextFieldInputProps = InputHTMLAttributes<HTMLInputElement> & {
  asChild?: boolean;
};

export const Input = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";

    return (
      <Comp
        className={twMerge(
          "bg-transparent flex-1 max-w-full border-none outline-none placeholder:text-zinc-400",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
