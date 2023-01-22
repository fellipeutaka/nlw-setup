import { View } from "react-native";

import { HabitGrid } from "./HabitGrid";
import { WeekRow } from "./WeekRow";

export function CalendarGraph() {
  return (
    <View className="w-full">
      <WeekRow />
      <HabitGrid />
    </View>
  );
}
