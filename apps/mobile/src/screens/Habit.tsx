import { ScrollView, Text, View } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "axios-config";
import { clsx } from "clsx";
import dayjs from "dayjs";

import type { RootStackParamList } from "@mobile/@types/RootStackParamList";
import { Checkbox } from "@mobile/components/form/Checkbox";
import { BackButton } from "@mobile/components/ui/BackButton";
import { HabitsEmpty } from "@mobile/components/ui/HabitsEmpty";
import { ProgressBar } from "@mobile/components/ui/ProgressBar";
import { RenderIf } from "@mobile/components/utils/RenderIf";
import { useRefetchOnFocus } from "@mobile/hooks/useRefetchOnFocus";
import { queryClient } from "@mobile/lib/reactQuery";

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  completedHabits: string[];
}

export function Habit() {
  const { params } = useRoute<RouteProp<RootStackParamList, "habit">>();
  const { data, isLoading, error, refetch } = useQuery<HabitsInfo>({
    queryKey: ["/habits/day", { date: params.date }],
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await api.get(String(queryKey[0]), {
        params: {
          date: params.date,
        },
        signal,
      });
      return data;
    },
  });
  useRefetchOnFocus(refetch);

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

    queryClient.setQueriesData(["/habits/day", { date: params.date }], {
      possibleHabits: data!.possibleHabits,
      completedHabits,
    });
  }

  const parsedDate = dayjs(params.date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const completedPercentage = data?.possibleHabits.length
    ? Math.round(
        (data.completedHabits.length / data.possibleHabits.length) * 100
      )
    : 0;

  const isPossibleHabitsListEmpty = data?.possibleHabits.length === 0;

  return (
    <View className="flex-1 bg-black px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 mb-2 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={completedPercentage} />
        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isDateInPast && !isPossibleHabitsListEmpty,
          })}
        >
          <RenderIf condition={!isLoading && !error}>
            <RenderIf condition={isPossibleHabitsListEmpty}>
              <HabitsEmpty isDateInPast={isDateInPast} />
            </RenderIf>
            <RenderIf condition={!isPossibleHabitsListEmpty}>
              {data?.possibleHabits.map((habit) => (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  disabled={isDateInPast}
                  checked={data.completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  className="mb-3"
                />
              ))}
            </RenderIf>
          </RenderIf>
        </View>
        <RenderIf condition={isDateInPast && !isPossibleHabitsListEmpty}>
          <Text className="text-white mt-10 text-center">
            You can't edit habits from a past date.
          </Text>
        </RenderIf>
      </ScrollView>
    </View>
  );
}
