import { ZodError } from "zod";

import { Habit } from "../entities/habit";
import { InMemoryHabitsRepository } from "../repositories/in-memory-habits-repository";
import { CreateHabit } from "./create-habit";

describe("Create habit", () => {
  it("should be able to create a habit", async () => {
    const habitsRepository = new InMemoryHabitsRepository();
    const createHabit = new CreateHabit(habitsRepository);

    await createHabit.execute({
      title: "Drink 44 liters of water",
      weekDays: [0, 1, 2, 3],
    });

    expect(habitsRepository.habits).toHaveLength(1);
    expect(habitsRepository.habits.at(0)).toBeInstanceOf(Habit);
  });

  it("should not be able to create a habit with invalid params", async () => {
    const habitsRepository = new InMemoryHabitsRepository();
    const createHabit = new CreateHabit(habitsRepository);

    expect(() =>
      createHabit.execute({
        title: "",
        weekDays: [],
      })
    ).rejects.toBeInstanceOf(ZodError);

    expect(() =>
      createHabit.execute({
        title: "    ",
        weekDays: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      })
    ).rejects.toBeInstanceOf(ZodError);

    expect(() =>
      createHabit.execute({
        title: "Drink something",
        weekDays: [0, 44],
      })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
