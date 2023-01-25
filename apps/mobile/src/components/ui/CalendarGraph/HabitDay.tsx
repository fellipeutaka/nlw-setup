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

type HabitDayProps = TouchableOpacityProps & {
  date: Date;
  defaultCompleted?: number;
  total?: number;
};

export function HabitDay({
  className,
  defaultCompleted = 0,
  total = 0,
  date,
  ...props
}: HabitDayProps) {
  const completedPercentage =
    total > 0 ? Math.round((defaultCompleted / total) * 100) : 0;

  return (
    <TouchableOpacity
      {...props}
      className={clsx(
        "border-2 rounded-lg m-1",
        {
          ["bg-zinc-900 border-zinc-800"]: completedPercentage === 0,
          ["bg-violet-900 border-violet-700"]:
            completedPercentage > 0 && completedPercentage < 20,
          ["bg-violet-800 border-violet-600"]:
            completedPercentage >= 20 && completedPercentage < 40,
          ["bg-violet-700 border-violet-500"]:
            completedPercentage >= 40 && completedPercentage < 60,
          ["bg-violet-600 border-violet-500"]:
            completedPercentage >= 60 && completedPercentage < 80,
          ["bg-violet-500 border-violet-400"]: completedPercentage >= 80,
        },
        className
      )}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
}
