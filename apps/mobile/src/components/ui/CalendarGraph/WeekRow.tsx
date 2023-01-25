import { Text, View } from "react-native";

import { weekDays } from "@mobile/constants/weekDays";

import { DAY_SIZE } from "./HabitDay";

export function WeekRow() {
  return (
    <View className="flex-row mt-6 mb-3">
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
