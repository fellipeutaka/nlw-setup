import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { Summary } from "@web/@types/Summary";
import { RenderIf } from "@web/components/utils/RenderIf";
import { generateDatesFromYearBeginning } from "@web/utils/generateDatesFromYearBeginning";

import { HabitDay } from "./HabitDay";
import { PlaceholderDays } from "./PlaceholderDays";
import { SkeletonHabitDay } from "./SkeletonHabitDay";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function HabitGrid() {
  const { data, isLoading, error } = useQuery<{ summary: Summary[] }>([
    "/habits/summary",
  ]);

  if (error) {
    return (
      <div className="grid place-items-center w-full">
        <span className="text-xl font-semibold">
          An error has occurred! Try again later
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-7 grid-flow-col gap-3">
      <RenderIf condition={isLoading}>
        {summaryDates.map((date) => (
          <SkeletonHabitDay key={date.toString()} />
        ))}
      </RenderIf>
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
            />
          );
        })}
      </RenderIf>
      <RenderIf condition={amountOfDaysToFill > 0}>
        <PlaceholderDays amount={amountOfDaysToFill} />
      </RenderIf>
    </div>
  );
}
