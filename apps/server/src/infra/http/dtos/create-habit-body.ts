import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  Max,
  Min,
} from "class-validator";

export class CreateHabitBody {
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @Min(0, { each: true })
  @Max(6, { each: true })
  weekDays: number[];
}
