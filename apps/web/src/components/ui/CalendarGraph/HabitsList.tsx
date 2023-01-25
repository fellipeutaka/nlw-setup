import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "axios-config";
import dayjs from "dayjs";

import type { HabitsInfo } from "@web/@types/HabitsInfo";
import { Checkbox } from "@web/components/form/Checkbox";
import { RenderIf } from "@web/components/utils/RenderIf";
import { queryClient } from "@web/lib/reactQuery";

import { HabitsEmpty } from "./HabitsEmpty";
import { SkeletonHabitDayList } from "./SkeletonHabitDayList";

type HabitLisProps = {
  date: Date;
  onCompletedChanged: (completed: number) => void;
};

export function HabitsList({ date, onCompletedChanged }: HabitLisProps) {
  const { data, isLoading, error } = useQuery<HabitsInfo>({
    queryKey: ["/habits/day", { date: date.toISOString() }],
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await api.get(String(queryKey[0]), {
        params: {
          date: date.toISOString(),
        },
        signal,
      });
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: (habitId: string) => {
      return api.patch(`/habits/${habitId}/toggle`);
    },
  });

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = data?.completedHabits.includes(habitId);

    mutation.mutate(habitId);

    const completedHabits = isHabitAlreadyCompleted
      ? data!.completedHabits.filter((id) => id !== habitId)
      : [...data!.completedHabits, habitId];

    queryClient.setQueriesData(["/habits/day", { date: date.toISOString() }], {
      possibleHabits: data!.possibleHabits,
      completedHabits,
    });

    onCompletedChanged(completedHabits.length);
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const isHabitsListEmpty = data?.possibleHabits.length === 0;

  if (isLoading) {
    return <SkeletonHabitDayList />;
  }

  if (error) {
    return (
      <span className="text-lg font-semibold mt-6">
        An error has occurred! Try again later
      </span>
    );
  }

  return (
    <ul className="flex flex-col gap-3 mt-6 max-h-80 overflow-y-scroll">
      <RenderIf condition={isHabitsListEmpty}>
        <HabitsEmpty isDateInPast={isDateInPast} />
      </RenderIf>
      <RenderIf condition={!isHabitsListEmpty}>
        {data?.possibleHabits.map((habit) => (
          <li className="flex items-center gap-3" key={habit.id}>
            <Checkbox
              className="peer disabled:cursor-not-allowed"
              id={habit.id}
              checked={data.completedHabits.includes(habit.id)}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              disabled={isDateInPast}
            />
            <label
              className="peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400"
              htmlFor={habit.id}
            >
              {habit.title}
            </label>
          </li>
        ))}
      </RenderIf>
    </ul>
  );
}
