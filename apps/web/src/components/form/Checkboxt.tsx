import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

export const Checkbox = (props: CheckboxPrimitive.CheckboxProps) => (
  <CheckboxPrimitive.Root
    className="w-8 h-8 grid place-items-center rounded-lg bg-zinc-900 border-2 border-zinc-800 text-white data-[state=checked]:bg-green-500 data-[state=checked]:border-transparent transition"
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check size={20} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
