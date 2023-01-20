import { Habit } from "../entities/habit";

export type PossibleHabitsProps = {
  createdAt: Date;
  weekDay: number;
};

export abstract class HabitsRepository {
  abstract create(habit: Habit): Promise<void>;
  abstract getPossibleHabits(props: PossibleHabitsProps): Promise<Habit[]>;
  abstract getCompletedHabits(date: Date): Promise<string[] | null>;
}
