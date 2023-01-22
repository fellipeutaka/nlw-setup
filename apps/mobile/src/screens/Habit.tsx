import React from "react";
import { ScrollView, Text, View } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { clsx } from "clsx";
import dayjs from "dayjs";

import type { RootStackParamList } from "@mobile/@types/RootStackParamList";
import { Checkbox } from "@mobile/components/form/Checkbox";
import { BackButton } from "@mobile/components/ui/BackButton";
import { ProgressBar } from "@mobile/components/ui/ProgressBar";
import { RenderIf } from "@mobile/components/utils/RenderIf";

export function Habit() {
  const { params } = useRoute<RouteProp<RootStackParamList, "habit">>();

  const parsedDate = dayjs(params.date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = 0;

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

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isDateInPast,
          })}
        >
          <Checkbox
            title="Drink 2 liters of water"
            disabled={isDateInPast}
            className="mb-3"
          />
          <Checkbox title="Sleep 8 hours" disabled={isDateInPast} />
        </View>
        <RenderIf condition={isDateInPast}>
          <Text className="text-white mt-10 text-center">
            You can't edit habits from a past date.
          </Text>
        </RenderIf>
      </ScrollView>
    </View>
  );
}
