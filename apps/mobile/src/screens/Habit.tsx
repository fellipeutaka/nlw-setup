import { ScrollView, Text, View } from "react-native";

import { clsx } from "clsx";

import { RenderIf } from "@mobile/components/utils/RenderIf";

export function Habit() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* <BackButton /> */}

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {/* {dayOfWeek} */}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {/* {dayAndMonth} */}
        </Text>

        {/* <ProgressBar progress={habitsProgress} /> */}

        {/* <View
          className={clsx("mt-6", {
            ["opacity-50"]: isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits?.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits?.includes(habit.id)}
                onPress={() => handleToggleHabits(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View> */}
        {/* <RenderIf condition={isDateInPast}>
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de uma data passada.
          </Text>
          </RenderIf> */}
      </ScrollView>
    </View>
  );
}
