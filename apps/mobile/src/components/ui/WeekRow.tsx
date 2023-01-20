import { Text, View } from "react-native";

import { getWeekDays } from "@mobile/utils/getWeekDays";

import { DAY_SIZE } from "./HabitDay";

const weekDays = getWeekDays();

export function WeekRow() {
  return (
    <View className="flex-row mt-6 mb-2">
      {weekDays.map((weekDay) => (
        <Text
          key={weekDay}
          className="text-zinc-400 text-xl font-bold text-center mx-1"
          style={{ width: DAY_SIZE }}
        >
          {weekDay.charAt(0)}
        </Text>
      ))}
    </View>
  );
}
