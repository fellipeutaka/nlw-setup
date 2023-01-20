import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "./lib/prisma";
import { PrismaHabitsRepository } from "./repositories/prisma-habits-repository";
import { CreateHabit } from "./use-cases/create-habit";

export async function routes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const { title, weekDays } = request.body as any;

    const habitRepository = new PrismaHabitsRepository();
    const createHabit = new CreateHabit(habitRepository);

    await createHabit.execute({
      title,
      weekDays,
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: date,
        },
        weekDays: {
          some: {
            weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habitId;
      }) ?? null;

    return {
      possibleHabits,
      completedHabits,
    };
  });
}
