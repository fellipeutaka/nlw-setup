import { Dimensions } from "react-native";

import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import colors from "tailwindcss/colors";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function SkeletonHabitDay() {
  return (
    <MotiView
      className="m-1 rounded-lg"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    >
      <Skeleton
        width={DAY_SIZE}
        height={DAY_SIZE}
        backgroundColor={colors.zinc[800]}
      />
    </MotiView>
  );
}
