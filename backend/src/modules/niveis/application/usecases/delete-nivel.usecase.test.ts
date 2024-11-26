import "reflect-metadata";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteNivelUseCase } from "./delete-nivel.usecase";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";
import { nivelTestContainer } from "@modules/niveis/infra/di/nivel.test.container";

describe("DeleteNivelUseCase", () => {
  let nivelRepository: INivelRepository;

  beforeEach(() => {
    nivelRepository = nivelTestContainer.get<INivelRepository>("NivelRepository");
  });

  it("should delete a nivel if it exists", async () => {
    const nivel = "Pleno 1";

    const nivelCreated = await nivelRepository.create({ nivel });

    const deleteNivelUseCase = new DeleteNivelUseCase(nivelRepository);

    await expect(
      deleteNivelUseCase.execute(nivelCreated.id)
    ).resolves.not.toThrow();
  });

  it("should throw an error if the nivel does not exist", async () => {
    const deleteNivelUseCase = new DeleteNivelUseCase(nivelRepository);

    try {
      const nivelId = 1;

      await deleteNivelUseCase.execute(nivelId);
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
    }
  });
});