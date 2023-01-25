import { ScrollView, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { Summary } from "@mobile/@types/Summary";
import { useAppNavigation } from "@mobile/hooks/useAppNavigation";
import { useRefetchOnFocus } from "@mobile/hooks/useRefetchOnFocus";
import { generateDatesFromYearBeginning } from "@mobile/utils/generateDatesFromYearBeginning";

import { RenderIf } from "../../utils/RenderIf";
import { HabitDay } from "./HabitDay";
import { PlaceholderDays } from "./PlaceholderDays";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function HabitGrid() {
  const { navigate } = useAppNavigation();
  const { data, isLoading, error, refetch } = useQuery<{ summary: Summary[] }>([
    "/habits/summary",
  ]);
  useRefetchOnFocus(refetch);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 64 }}
    >
      <View className="flex-row w-full flex-wrap">
        <RenderIf condition={!isLoading && !error}>
          {summaryDates.map((date) => {
            const dayInSummary = data?.summary?.find((day) =>
              dayjs(date).isSame(day.date, "day")
            );
            return (
              <HabitDay
                key={date.toString()}
                date={date}
                total={dayInSummary?.total}
                defaultCompleted={dayInSummary?.completed}
                onPress={() => navigate("habit", { date: date.toISOString() })}
              />
            );
          })}
        </RenderIf>
        <RenderIf condition={amountOfDaysToFill > 0}>
          <PlaceholderDays amount={amountOfDaysToFill} />
        </RenderIf>
      </View>
    </ScrollView>
  );
}
