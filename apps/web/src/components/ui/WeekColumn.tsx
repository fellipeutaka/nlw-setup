import { getWeekDays } from "@web/utils/getWeekDays";

const weekDays = getWeekDays();

export function WeekColumn() {
  return (
    <div className="grid grid-rows-7 grid-flow-row gap-3">
      {weekDays.map((weekDay) => (
        <label
          key={weekDay}
          className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          aria-label={weekDay}
        >
          {weekDay.charAt(0)}
        </label>
      ))}
    </div>
  );
}
