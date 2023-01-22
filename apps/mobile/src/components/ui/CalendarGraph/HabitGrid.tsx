import { ScrollView, View } from "react-native";

import { useAppNavigation } from "@mobile/hooks/useAppNavigation";
import { generateDatesFromYearBeginning } from "@mobile/utils/generateDatesFromYearBeginning";

import { RenderIf } from "../../utils/RenderIf";
import { HabitDay } from "./HabitDay";
import { PlaceholderDays } from "./PlaceholderDays";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function HabitGrid() {
  const { navigate } = useAppNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 64 }}
    >
      <View className="flex-row w-full flex-wrap">
        {summaryDates.map((date) => (
          <HabitDay
            key={date.toString()}
            onPress={() => navigate("habit", { date: date.toISOString() })}
          />
        ))}
        <RenderIf condition={amountOfDaysToFill > 0}>
          <PlaceholderDays amount={amountOfDaysToFill} />
        </RenderIf>
      </View>
    </ScrollView>
  );
}
