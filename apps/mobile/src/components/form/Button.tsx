import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { clsx } from "clsx";

type RootProps = TouchableOpacityProps;

export const Button = ({ className, ...props }: RootProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={clsx(
        "flex flex-row items-center border border-violet-500 font-semibold rounded-lg px-4 py-3",
        className
      )}
    />
  );
};
