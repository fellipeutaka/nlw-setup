import { Habit } from "../entities/habit";
import { HabitsRepository } from "./habits-repository";

export class InMemoryHabitsRepository implements HabitsRepository {
  public habits: Habit[] = [];

  async create(habit: Habit) {
    this.habits.push(habit);
  }
}
