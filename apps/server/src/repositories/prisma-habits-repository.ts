import { Habit } from "../entities/habit";
import { prisma } from "../lib/prisma";
import { HabitsRepository } from "./habits-repository";

export class PrismaHabitsRepository implements HabitsRepository {
  async create(habit: Habit) {
    const { id, title, weekDays, createdAt } = habit;

    await prisma.habit.create({
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
}
