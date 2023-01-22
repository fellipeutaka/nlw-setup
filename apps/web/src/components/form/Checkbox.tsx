import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { twMerge } from "tailwind-merge";

export const Checkbox = ({
  className,
  ...props
}: CheckboxPrimitive.CheckboxProps) => (
  <CheckboxPrimitive.Root
    {...props}
    className={twMerge(
      "w-8 h-8 outline-none grid place-items-center rounded-lg bg-zinc-900 border-2 border-zinc-800 text-white data-[state=checked]:bg-green-500 data-[state=checked]:border-transparent focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 transition",
      className
    )}
  >
    <CheckboxPrimitive.Indicator>
      <Check size={20} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
