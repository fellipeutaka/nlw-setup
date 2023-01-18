import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { prisma } from "./lib/prisma";

export async function routes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.number().min(0).max(6).array().min(1).max(7),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    await prisma.habit.create({
      data: {
        id: randomUUID(),
        title,
        createdAt: dayjs().startOf("day").toDate(),
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              id: randomUUID(),
              weekDay,
            };
          }),
        },
      },
    });
  });
}
