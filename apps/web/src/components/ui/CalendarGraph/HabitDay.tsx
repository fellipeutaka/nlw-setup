import { useState } from "react";

import * as Popover from "@radix-ui/react-popover";
import { clsx } from "clsx";
import dayjs from "dayjs";

import { HabitsDayList } from "./HabitDayList";
import { ProgressBar } from "./ProgressBar";

type HabitDayProps = {
  date: Date;
  defaultCompleted?: number;
  total?: number;
};

export function HabitDay({
  defaultCompleted = 0,
  total = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2 rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:opacity-70",
          {
            "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            "bg-violet-900 border-violet-500":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-500":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[24rem] p-6 rounded-2xl bg-zinc-900 flex flex-col shadow animate-popoverShow">
          <span className="text-zinc-400 font-semibold lowercase">
            {dayOfWeek}
          </span>
          <b className="text-3xl font-extrabold mt-2">{dayAndMonth}</b>
          <ProgressBar progress={completedPercentage} />
          <HabitsDayList
            date={date}
            onCompletedChanged={handleCompletedChanged}
          />
          <Popover.Arrow height={12} width={24} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
