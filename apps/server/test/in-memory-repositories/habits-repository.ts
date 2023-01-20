import { Habit } from "@server/src/app/entities/habit";
import { WeekDay } from "@server/src/app/entities/weekDay";
import {
  HabitsRepository,
  PossibleHabitsProps,
} from "@server/src/app/repositories/habits-repository";

export class InMemoryHabitsRepository implements HabitsRepository {
  public habits: Habit[] = [];

  async create(habit: Habit) {
    this.habits.push(habit);
  }

  async getPossibleHabits({ createdAt, weekDay }: PossibleHabitsProps) {
    const possibleHabits = this.habits.filter(
      (habit) =>
        habit.createdAt <= createdAt &&
        habit.weekDays.some(({ weekDay }) => weekDay === weekDay)
    );

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
    // TODO:
    const completedHabits = [];

    return completedHabits ?? null;
  }
}
