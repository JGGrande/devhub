import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateNivelUseCase } from "./update-nivel.usecase";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";
import { nivelTestContainer } from "@modules/niveis/infra/di/nivel.test.container";
import { Nivel } from "@modules/niveis/domain/entities/nivel";

describe("UpdateNivelUseCase", () => {
  let nivelRepository: INivelRepository;

  beforeEach(() => {
    nivelRepository = nivelTestContainer.get<INivelRepository>("NivelRepository");
  });

  it("should update the nivel successfully", async () => {
    const updateNivelUseCase = new UpdateNivelUseCase(nivelRepository);

    const nivel = "Pleno 1";
    const newNivel = "Sênior 2";

    const nivelCreated = await nivelRepository.create({ nivel });

    const result = await updateNivelUseCase.execute(nivelCreated.id, newNivel);

    const expectedNivelUpdated = new Nivel({
      id: nivelCreated.id,
      nivel: newNivel
    });

    expect(result).toEqual(expectedNivelUpdated);
  });

  it("should throw an error if nivel is not found", async () => {
    const updateNivelUseCase = new UpdateNivelUseCase(nivelRepository);

    try {
      const nivelId = 1;
      const newNivel = "Sênior 2";

      await updateNivelUseCase.execute(nivelId, newNivel);
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
    }
  });
});