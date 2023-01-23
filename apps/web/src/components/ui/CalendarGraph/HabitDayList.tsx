import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "axios-config";
import dayjs from "dayjs";

import { Checkbox } from "@web/components/form/Checkbox";
import { queryClient } from "@web/lib/reactQuery";

import { SkeletonHabitDayList } from "./SkeletonHabitDayList";

interface HabitLisProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  completedHabits: string[];
}

export function HabitsDayList({ date, onCompletedChanged }: HabitLisProps) {
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
    <ul className="flex flex-col gap-3 mt-6">
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
    </ul>
  );
}
