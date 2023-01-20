import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { z } from "zod";

import { HabitsRepository } from "../repositories/habits-repository";

type GetHabitsRequest = {
  date: string;
};

@Injectable()
export class GetHabits {
  constructor(private readonly habitsRepository: HabitsRepository) {}

  async execute(request: GetHabitsRequest) {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request);

    const weekDay = dayjs(date).startOf("day").get("day");

    const possibleHabits = await this.habitsRepository.getPossibleHabits({
      createdAt: date,
      weekDay,
    });

    const completedHabits = await this.habitsRepository.getCompletedHabits(
      date
    );

    return {
      possibleHabits,
      completedHabits,
    };
  }
}
