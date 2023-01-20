import { Module } from "@nestjs/common";

import { CreateHabit } from "@server/src/app/use-cases/create-habit";
import { GetHabits } from "@server/src/app/use-cases/get-habits";

import { DatabaseModule } from "../database/database.module";
import { HabitsController } from "./controllers/habits.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [HabitsController],
  providers: [CreateHabit, GetHabits],
})
export class HttpModule {}
