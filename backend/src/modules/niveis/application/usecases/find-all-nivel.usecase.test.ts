import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { FindAllNivelUseCase } from "./find-all-nivel.usecase";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";
import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { nivelTestContainer } from "@modules/niveis/infra/di/nivel.test.container";

describe("FindAllNivelUseCase", () => {
  let nivelRepository: INivelRepository;

  beforeEach(() => {
    nivelRepository = nivelTestContainer.get<INivelRepository>("NivelRepository");
  });

  it("should return all níveis when they exist", async () => {
    const mockNiveis: Nivel[] = [
      new Nivel({ id: 1, nivel: "Junior 1" }),
      new Nivel({ id: 2, nivel: "Junior 2" }),
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create(nivel);
    })

    const findAllNivelUseCase = new FindAllNivelUseCase(nivelRepository);

    const result = await findAllNivelUseCase.execute();

    expect(result).toEqual(mockNiveis);
  });

  it("should throw an error when no niveis are found", async () => {
    const findAllNivelUseCase = new FindAllNivelUseCase(nivelRepository);

    try{
      await findAllNivelUseCase.execute();
    }catch(error){
      expect(error).instanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
    }
  });
});