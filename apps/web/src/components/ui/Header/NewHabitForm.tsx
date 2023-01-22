import { FormEvent } from "react";

import { Check } from "phosphor-react";

import { Button } from "@web/components/form/Button";
import { Checkbox } from "@web/components/form/Checkbox";
import * as TextField from "@web/components/form/TextField";
import { weekDays } from "@web/constants/weekDays";

export function NewHabitForm() {
  const handleCreateNewHabit = (e: FormEvent) => {
    e.preventDefault();
  };

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
            id="title"
            placeholder="Exercise, sleep well, etc..."
          />
        </TextField.Root>
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <label className="font-semibold">What's the recurrence?</label>
        <ul className="flex flex-col gap-2">
          {weekDays.map((weekDay) => (
            <li className="flex items-center gap-3" key={weekDay}>
              <Checkbox
                id={weekDay}
                className="focus-visible:ring-offset-zinc-900"
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
