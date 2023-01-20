import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { Habit } from "../entities/habit";
import { WeekDay } from "../entities/weekDay";
import { HabitsRepository } from "../repositories/habits-repository";

type CreateHabitRequest = {
  title: string;
  weekDays: number[];
};

@Injectable()
export class CreateHabit {
  constructor(private readonly habitsRepository: HabitsRepository) {}

  async execute(request: CreateHabitRequest) {
    const createHabitSchema = z.object({
      title: z.string().trim().min(1),
      weekDays: z.number().min(0).max(6).array().min(1).max(7),
    });

    const { title, weekDays } = createHabitSchema.parse(request);

    const habit = new Habit({
      title,
      weekDays: weekDays.map((weekDay) => new WeekDay({ weekDay })),
    });

    await this.habitsRepository.create(habit);
  }
}
