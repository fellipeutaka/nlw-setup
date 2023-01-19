import { generateDatesFromYearBeginning } from "@web/utils/generateDatesFromYearBeginning";

import { RenderIf } from "../utils/RenderIf";
import { HabitDay } from "./HabitDay";
import { PlaceholderDays } from "./PlaceholderDays";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function HabitGrid() {
  return (
    <div className="grid grid-rows-7 grid-flow-col gap-3">
      {summaryDates.map((date) => (
        <HabitDay key={date.toString()} />
      ))}
      <RenderIf condition={amountOfDaysToFill > 0}>
        <PlaceholderDays amount={amountOfDaysToFill} />
      </RenderIf>
    </div>
  );
}
