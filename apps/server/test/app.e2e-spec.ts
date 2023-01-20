import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "./../src/app.module";

describe("HabitController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("/habits (POST)", () => {
    it("should not be able to create a habit with invalid params", async () => {
      return await request(app.getHttpServer())
        .post("/habits")
        .send({
          title: "Drink 2 liters of water",
          weekDays: [],
        })
        .expect(500);
    });
  });
});
