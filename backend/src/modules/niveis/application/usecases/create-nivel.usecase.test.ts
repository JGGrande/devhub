import "reflect-metadata";
import { describe, it, expect } from "vitest";
import { CreateNivelUseCase } from "./create-nivel.usecase";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { nivelTestContainer } from "@modules/niveis/infra/di/nivel.test.container";
import { Nivel } from "@modules/niveis/domain/entities/nivel";

describe("CreateNivelUseCase", () => {
  it("should create a new nivel", async () => {
    const nivelRepository = nivelTestContainer.get<INivelRepository>("NivelRepository")

    const createNivelUseCase = new CreateNivelUseCase(nivelRepository);

    const nivel = "Junior 1";

    const result = await createNivelUseCase.execute(nivel);

    const expectedResult = new Nivel({
      id: 1,
      nivel
    });

    expect(result).instanceOf(Nivel);
    expect(result).toEqual(expectedResult);
  });
});