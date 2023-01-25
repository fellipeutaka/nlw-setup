import { Button } from "@web/components/form/Button";

type HabitsEmptyProps = {
  isDateInPast: boolean;
};

export function HabitsEmpty({ isDateInPast }: HabitsEmptyProps) {
  if (isDateInPast) {
    return (
      <p className="text-zinc-400 text-base">
        There are no habits being tracked on that day
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-zinc-400 text-base">
        You are not tracking any habits yet.
      </p>
      <Button
        onClick={() => document.getElementById("createHabitBtn")?.click()}
      >
        Start registering one
      </Button>
    </div>
  );
}
