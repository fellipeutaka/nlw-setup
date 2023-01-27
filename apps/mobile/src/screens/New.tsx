import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View, Alert } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { api } from "axios-config";
import { Check } from "phosphor-react-native";
import { z } from "zod";

import { Button } from "@mobile/components/form/Button";
import { Checkbox } from "@mobile/components/form/Checkbox";
import { TextField } from "@mobile/components/form/TextField";
import { BackButton } from "@mobile/components/ui/BackButton";
import { RenderIf } from "@mobile/components/utils/RenderIf";
import { weekDays } from "@mobile/constants/weekDays";
import { queryClient } from "@mobile/lib/reactQuery";

const newHabitSchema = z.object({
  title: z.string().trim().min(1, "Please, type your commitment"),
  weekDays: z
    .number()
    .min(0)
    .max(6)
    .array()
    .min(1, "Please, select one day of week at least")
    .max(7),
});

type FormData = z.output<typeof newHabitSchema>;

type HandleToggleWeekDayProps = {
  selectedWeekDays: number[];
  weekDay: number;
  onChange: (newValue: number[]) => void;
};

export function New() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: {
      title: "",
      weekDays: [],
    },
  });
  const { goBack } = useNavigation();

  const handleCreateNewHabit = handleSubmit(async ({ title, weekDays }) => {
    try {
      await api.post("habits", {
        title,
        weekDays,
      });
      await queryClient.invalidateQueries();
      Alert.alert("New habit", "Habit created successfully!");
      goBack();
    } catch (err) {
      Alert.alert(
        "New habit",
        "An error has occurred while trying to create your habit. Try again later!"
      );
    }
  });

  const handleToggleWeekDay = useCallback((props: HandleToggleWeekDayProps) => {
    if (props.selectedWeekDays.includes(props.weekDay)) {
      const weekDaysWithRemovedOne = props.selectedWeekDays.filter(
        (day) => day !== props.weekDay
      );
      props.onChange(weekDaysWithRemovedOne);
    } else {
      props.onChange([...props.selectedWeekDays, props.weekDay]);
    }
  }, []);

  return (
    <View className="flex-1 bg-black px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Create habit
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          What's your commitment?
        </Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { name, onChange, ...field } }) => (
            <TextField
              placeholder="Exercise, sleep well, etc..."
              className="mt-3"
              onChangeText={onChange}
              {...field}
            />
          )}
        />
        <RenderIf condition={Boolean(errors.title)}>
          <Text className="text-red-600 mt-1">{errors.title?.message}</Text>
        </RenderIf>
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What's the recurrence?
        </Text>
        {weekDays.map((weekDay, index) => (
          <Controller
            key={weekDay}
            name="weekDays"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                title={weekDay}
                checked={value.includes(index)}
                onPress={() =>
                  handleToggleWeekDay({
                    weekDay: index,
                    selectedWeekDays: value,
                    onChange,
                  })
                }
              />
            )}
          />
        ))}
        <RenderIf condition={Boolean(errors.weekDays)}>
          <Text className="text-red-600">{errors.weekDays?.message}</Text>
        </RenderIf>
        <Button
          className="bg-green-600 border-transparent h-16 mt-6"
          onPress={handleCreateNewHabit}
          disabled={!isDirty}
          isLoading={isSubmitting}
        >
          <Check size={20} color="white" weight="bold" />
          <Text className="font-semibold text-base text-white ml-3">
            Confirm
          </Text>
        </Button>
      </ScrollView>
    </View>
  );
}
