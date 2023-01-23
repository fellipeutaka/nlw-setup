import { Checkbox } from "@web/components/form/Checkbox";

type SkeletonHabitDayListProps = {
  rows?: number;
};

export function SkeletonHabitDayList({ rows = 4 }: SkeletonHabitDayListProps) {
  return (
    <ul className="flex flex-col gap-3 mt-6">
      {Array.from({ length: rows }).map((_, i) => (
        <li className="flex items-center gap-3" key={i}>
          <Checkbox
            className="bg-zinc-800 border-zinc-700 cursor-progress animate-pulse"
            disabled
          />
          <div className="flex-1 h-5 bg-zinc-800 rounded cursor-progress animate-pulse" />
        </li>
      ))}
    </ul>
  );
}
