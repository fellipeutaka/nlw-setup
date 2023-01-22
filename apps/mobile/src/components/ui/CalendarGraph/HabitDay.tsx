import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { clsx } from "clsx";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

type HabitDayProps = TouchableOpacityProps & {};

export function HabitDay({ className, ...props }: HabitDayProps) {
  return (
    <TouchableOpacity
      {...props}
      className={clsx(
        "bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1",
        className
      )}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
}
