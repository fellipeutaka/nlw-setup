import { ButtonHTMLAttributes, forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import { SpinnerGap } from "phosphor-react";
import { twMerge } from "tailwind-merge";

type RootProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, RootProps>(
  ({ asChild, className, children, disabled, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type="button"
        {...props}
        disabled={disabled || isLoading}
        className={twMerge(
          "flex justify-center items-center border border-violet-500 font-semibold rounded-lg px-6 py-4 gap-3 outline-none text-violet-500 hover:bg-violet-500 hover:text-white focus-visible:bg-violet-500 focus-visible:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
          className
        )}
        ref={ref}
      >
        {isLoading ? (
          <SpinnerGap className="animate-spin" size={24} weight="bold" />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
