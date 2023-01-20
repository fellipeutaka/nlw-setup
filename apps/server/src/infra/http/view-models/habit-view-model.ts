import { Habit } from "@server/src/app/entities/habit";

export class HabitViewModel {
  static toHTTP(habit: Habit) {
    return {
      id: habit.id,
      title: habit.title,
      weekDays: habit.weekDays.map((weekDay) => ({
        id: weekDay.id,
        weekDay: weekDay.weekDay,
      })),
      createdAt: habit.createdAt,
    };
  }
}
