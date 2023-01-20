import { Habit } from "../entities/habit";

export abstract class HabitsRepository {
  abstract create(habit: Habit): Promise<void>;
}
