import { ButtonHTMLAttributes } from "react";

import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

type RootProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export const Button = ({ asChild, className, ...props }: RootProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type="button"
      {...props}
      className={clsx(
        "flex items-center border border-violet-500 font-semibold rounded-lg px-6 py-4 gap-3 text-violet-500 hover:bg-violet-500 hover:text-white transition-colors",
        className
      )}
    />
  );
};
