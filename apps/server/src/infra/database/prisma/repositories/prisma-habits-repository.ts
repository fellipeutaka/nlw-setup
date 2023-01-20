import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";

import { Habit } from "@server/src/app/entities/habit";
import { WeekDay } from "@server/src/app/entities/weekDay";
import {
  HabitsRepository,
  PossibleHabitsProps,
} from "@server/src/app/repositories/habits-repository";

import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaHabitsRepository implements HabitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(habit: Habit) {
    const { id, title, weekDays, createdAt } = habit;

    await this.prisma.habit.create({
      data: {
        id,
        title,
        createdAt,
        weekDays: {
          create: weekDays.map((weekDay) => ({
            id: weekDay.id,
            weekDay: weekDay.weekDay,
          })),
        },
      },
    });
  }

  async getPossibleHabits({ createdAt, weekDay }: PossibleHabitsProps) {
    const possibleHabits = await this.prisma.habit.findMany({
      where: {
        createdAt: {
          lte: createdAt,
        },
        weekDays: {
          some: {
            weekDay,
          },
        },
      },
      include: {
        weekDays: true,
      },
    });

    return possibleHabits.map(
      ({ id, title, createdAt, weekDays }) =>
        new Habit(
          {
            title,
            createdAt,
            weekDays: weekDays.map(
              ({ id, weekDay }) => new WeekDay({ weekDay }, id)
            ),
          },
          id
        )
    );
  }

  async getCompletedHabits(date: Date) {
    const day = await this.prisma.day.findFirst({
      where: {
        date: dayjs(date).startOf("day").toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habitId);

    return completedHabits ?? null;
  }
}
