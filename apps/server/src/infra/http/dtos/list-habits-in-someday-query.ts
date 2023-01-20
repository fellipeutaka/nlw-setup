import { IsDateString } from "class-validator";

export class ListHabitsInSomedayQuery {
  @IsDateString()
  date: string;
}
