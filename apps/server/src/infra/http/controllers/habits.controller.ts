import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CreateHabit } from "@server/src/app/use-cases/create-habit";
import { GetHabits } from "@server/src/app/use-cases/get-habits";

import { CreateHabitBody } from "../dtos/create-habit-body";
import { ListHabitsInSomedayQuery } from "../dtos/list-habits-in-someday-query";
import { HabitViewModel } from "../view-models/habit-view-model";

@Controller("habits")
export class HabitsController {
  constructor(
    private readonly createHabit: CreateHabit,
    private readonly getHabits: GetHabits
  ) {}

  @Post()
  async create(@Body() body: CreateHabitBody) {
    const { title, weekDays } = body;

    await this.createHabit.execute({
      title,
      weekDays,
    });
  }

  @Get("day")
  async listHabitsInSomeday(@Query() query: ListHabitsInSomedayQuery) {
    const { date } = query;

    const { possibleHabits, completedHabits } = await this.getHabits.execute({
      date,
    });

    return {
      possibleHabits: possibleHabits.map(HabitViewModel.toHTTP),
      completedHabits,
    };
  }
}
