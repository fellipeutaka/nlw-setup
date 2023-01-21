import { ButtonHTMLAttributes } from "react";

import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

type RootProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export const Button = ({ asChild, className, ...props }: RootProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type="button"
      {...props}
      className={twMerge(
        "flex justify-center items-center border border-violet-500 font-semibold rounded-lg px-6 py-4 gap-3 outline-none text-violet-500 hover:bg-violet-500 hover:text-white focus-visible:bg-violet-500 focus-visible:text-white transition-colors",
        className
      )}
    />
  );
};
