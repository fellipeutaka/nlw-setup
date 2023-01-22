import { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

import { Check } from "phosphor-react-native";

import { RenderIf } from "@mobile/components/utils/RenderIf";

type CheckboxProps = TouchableOpacityProps & {
  title: string;
  checked?: boolean;
};

export const Checkbox = forwardRef<TouchableOpacity, CheckboxProps>(
  ({ title, checked = false, ...rest }, ref) => {
    return (
      <TouchableOpacity
        {...rest}
        activeOpacity={0.7}
        className="flex-row mb-2 items-center"
        ref={ref}
      >
        <RenderIf condition={checked}>
          <Animated.View
            className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Check size={20} color="white" />
          </Animated.View>
        </RenderIf>
        <RenderIf condition={!checked}>
          <View className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg" />
        </RenderIf>
        <Text className="text-white text-base ml-3">{title}</Text>
      </TouchableOpacity>
    );
  }
);
