import { HabitGrid } from "./HabitGrid";
import { WeekColumn } from "./WeekColumn";

export function CalendarGraph() {
  return (
    <section className="w-full flex">
      <WeekColumn />
      <HabitGrid />
    </section>
  );
}
