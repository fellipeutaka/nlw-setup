import { TextInput, TextInputProps } from "react-native";

import { clsx } from "clsx";
import colors from "tailwindcss/colors";

export const TextField = ({ className, ...props }: TextInputProps) => (
  <TextInput
    {...props}
    placeholderTextColor={colors.zinc[400]}
    className={clsx(
      "p-4 rounded-lg bg-zinc-900 text-white border-2 border-zinc-800 focus:border-violet-500",
      className
    )}
  />
);
