import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

const firstHabit = {
  id: "0730ffac-d039-4194-9571-01aa2aa0efbd",
  createdAt: new Date("2022-12-31T03:00:00.000"),
};

const secondHabit = {
  id: "00880d75-a933-4fef-94ab-e05744435297",
  createdAt: new Date("2023-01-03T03:00:00.000"),
};

const thirdHabit = {
  id: "fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00",
  createdAt: new Date("2023-01-08T03:00:00.000"),
};

async function run() {
  await prisma.habitWeekDays.deleteMany();
  await prisma.day.deleteMany();
  await prisma.habit.deleteMany();

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabit.id,
        title: "Drink 2 liters of water",
        createdAt: firstHabit.createdAt,
        weekDays: {
          create: [
            { id: randomUUID(), weekDay: 1 },
            { id: randomUUID(), weekDay: 2 },
            { id: randomUUID(), weekDay: 3 },
          ],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: secondHabit.id,
        title: "Work out",
        createdAt: secondHabit.createdAt,
        weekDays: {
          create: [
            { id: randomUUID(), weekDay: 3 },
            { id: randomUUID(), weekDay: 4 },
            { id: randomUUID(), weekDay: 5 },
          ],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: thirdHabit.id,
        title: "Sleep 8 hours",
        createdAt: thirdHabit.createdAt,
        weekDays: {
          create: [
            { id: randomUUID(), weekDay: 1 },
            { id: randomUUID(), weekDay: 2 },
            { id: randomUUID(), weekDay: 3 },
            { id: randomUUID(), weekDay: 4 },
            { id: randomUUID(), weekDay: 5 },
          ],
        },
      },
    }),
  ]);

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        id: randomUUID(),
        date: new Date("2023-01-02T03:00:00.000z"),
        dayHabits: {
          create: {
            id: randomUUID(),
            habitId: firstHabit.id,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        id: randomUUID(),
        date: new Date("2023-01-06T03:00:00.000z"),
        dayHabits: {
          create: {
            id: randomUUID(),
            habitId: firstHabit.id,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        id: randomUUID(),
        date: new Date("2023-01-04T03:00:00.000z"),
        dayHabits: {
          create: [
            { id: randomUUID(), habitId: firstHabit.id },
            { id: randomUUID(), habitId: secondHabit.id },
          ],
        },
      },
    }),
  ]);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
