import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { clsx } from "clsx";

import { Spinner } from "../ui/Spinner";

type RootProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

export const Button = ({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: RootProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || isLoading}
      className={clsx(
        "flex flex-row justify-center items-center border border-violet-500 font-semibold rounded-lg px-4 py-3",
        { "opacity-30": disabled || isLoading },
        className
      )}
    >
      {isLoading ? <Spinner color="white" /> : children}
    </TouchableOpacity>
  );
};
