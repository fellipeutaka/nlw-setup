import { Module } from "@nestjs/common";

import { HabitsRepository } from "@server/src/app/repositories/habits-repository";

import { PrismaService } from "./prisma/prisma.service";
import { PrismaHabitsRepository } from "./prisma/repositories/prisma-habits-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: HabitsRepository,
      useClass: PrismaHabitsRepository,
    },
  ],
  exports: [HabitsRepository],
})
export class DatabaseModule {}
