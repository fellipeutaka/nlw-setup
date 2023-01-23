import { HabitGrid } from "./HabitGrid";
import { WeekColumn } from "./WeekColumn";

export function CalendarGraph() {
  return (
    <section className="w-full flex gap-3">
      <WeekColumn />
      <HabitGrid />
    </section>
  );
}
