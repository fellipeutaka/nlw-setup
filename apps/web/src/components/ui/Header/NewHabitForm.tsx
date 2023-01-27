import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "axios-config";
import { Check } from "phosphor-react";
import { z } from "zod";

import { Button } from "@web/components/form/Button";
import { Checkbox } from "@web/components/form/Checkbox";
import * as TextField from "@web/components/form/TextField";
import { weekDays } from "@web/constants/weekDays";
import { useToast } from "@web/hooks/useToast";
import { queryClient } from "@web/lib/reactQuery";
import { handleScape } from "@web/utils/handleScape";

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

export function NewHabitForm() {
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
  const toast = useToast();

  const handleCreateNewHabit = handleSubmit(async ({ title, weekDays }) => {
    try {
      await api.post("habits", {
        title,
        weekDays,
      });
      await queryClient.invalidateQueries();
      handleScape();
      toast.show({
        message: "Habit created successfully!",
        type: "success",
      });
    } catch (err) {
      toast.show({
        message:
          "An error has occurred while trying to create your habit. Try again later!",
        type: "error",
      });
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
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleCreateNewHabit}
    >
      <fieldset className="flex flex-col gap-3">
        <label htmlFor="title" className="font-semibold">
          What's your commitment?
        </label>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { invalid } }) => (
            <TextField.Root aria-invalid={invalid}>
              <TextField.Input
                {...field}
                type="text"
                id="title"
                placeholder="Exercise, sleep well, etc..."
                autoComplete="off"
              />
            </TextField.Root>
          )}
        />
        <span className="text-red-600 -mt-2 mb-2">{errors.title?.message}</span>
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <label className="font-semibold">What's the recurrence?</label>
        <ul className="flex flex-col gap-2">
          {weekDays.map((weekDay, index) => (
            <li className="flex items-center gap-3" key={weekDay}>
              <Controller
                name="weekDays"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value.includes(index)}
                    onCheckedChange={() =>
                      handleToggleWeekDay({
                        weekDay: index,
                        selectedWeekDays: value,
                        onChange,
                      })
                    }
                    id={weekDay}
                  />
                )}
              />
              <label htmlFor={weekDay}>{weekDay}</label>
            </li>
          ))}
        </ul>
        <span className="text-red-600 -mt-2 mb-2">
          {errors.weekDays?.message}
        </span>
      </fieldset>
      <Button
        type="submit"
        className="bg-green-600 text-white border-none w-full hover:bg-green-500 focus-visible:bg-green-500 mt-2"
        disabled={!isDirty}
        isLoading={isSubmitting}
      >
        <Check size={20} weight="bold" />
        <span>Confirm</span>
      </Button>
    </form>
  );
}
