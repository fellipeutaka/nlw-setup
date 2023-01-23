import { FormEvent, useState } from "react";

import { api } from "axios-config";
import { Check } from "phosphor-react";

import { Button } from "@web/components/form/Button";
import { Checkbox } from "@web/components/form/Checkbox";
import * as TextField from "@web/components/form/TextField";
import { weekDays } from "@web/constants/weekDays";
import { handleScape } from "@web/utils/handleScape";

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  const handleCreateNewHabit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || selectedWeekDays.length === 0) {
      return alert(
        "Please, type your commitment and select one day of week at least"
      );
    }
    await api.post("habits", {
      title,
      weekDays: selectedWeekDays,
    });

    handleScape();

    alert("Hábito criado com sucesso!");
  };

  function handleToggleWeekDay(weekDay: number) {
    if (selectedWeekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = selectedWeekDays.filter(
        (day) => day !== weekDay
      );
      setSelectedWeekDays(weekDaysWithRemovedOne);
    } else {
      setSelectedWeekDays((state) => [...state, weekDay]);
    }
  }

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleCreateNewHabit}
    >
      <fieldset className="flex flex-col gap-3">
        <label htmlFor="title" className="font-semibold">
          What's your commitment?
        </label>
        <TextField.Root>
          <TextField.Input
            type="text"
            id="title"
            placeholder="Exercise, sleep well, etc..."
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TextField.Root>
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <label className="font-semibold">What's the recurrence?</label>
        <ul className="flex flex-col gap-2">
          {weekDays.map((weekDay, index) => (
            <li className="flex items-center gap-3" key={weekDay}>
              <Checkbox
                id={weekDay}
                checked={selectedWeekDays.includes(index)}
                onCheckedChange={() => handleToggleWeekDay(index)}
              />
              <label htmlFor={weekDay}>{weekDay}</label>
            </li>
          ))}
        </ul>
      </fieldset>
      <Button
        type="submit"
        className="bg-green-600 text-white border-none w-full hover:bg-green-500 focus-visible:bg-green-500 mt-2"
      >
        <Check size={20} weight="bold" />
        <span>Confirm</span>
      </Button>
    </form>
  );
}
