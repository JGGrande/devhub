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

    const result = await findAllNivelUseCase.execute({
      page: 1,
      limit: 10,
      orderKey: 'id',
      orderValue: 'ASC'
    });

    expect(result.data).toEqual(mockNiveis);
  });

  it("should throw an error when no niveis are found", async () => {
    const findAllNivelUseCase = new FindAllNivelUseCase(nivelRepository);

    try {
      await findAllNivelUseCase.execute({
        page: 1,
        limit: 10,
        orderKey: 'id',
        orderValue: 'ASC'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it("should return paginated níveis", async () => {
    const mockNiveis: Nivel[] = [
      new Nivel({ id: 1, nivel: "Junior 1" }),
      new Nivel({ id: 2, nivel: "Junior 2" }),
      new Nivel({ id: 3, nivel: "Pleno 1" }),
      new Nivel({ id: 4, nivel: "Pleno 2" }),
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create(nivel);
    });

    const findAllNivelUseCase = new FindAllNivelUseCase(nivelRepository);

    const resultPage1 = await findAllNivelUseCase.execute({
      page: 1,
      limit: 2,
      orderKey: 'id',
      orderValue: 'ASC'
    });

    const resultPage2 = await findAllNivelUseCase.execute({
      page: 2,
      limit: 2,
      orderKey: 'id',
      orderValue: 'ASC'
    });

    expect(resultPage1.data).toEqual([mockNiveis[0], mockNiveis[1]]);
    expect(resultPage1.meta).toEqual({
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2
    });

    expect(resultPage2.data).toEqual([mockNiveis[2], mockNiveis[3]]);
    expect(resultPage2.meta).toEqual({
      total: 4,
      current_page: 2,
      per_page: 2,
      last_page: 2
    });
  });

  it("should return filtered níveis based on searchTerm", async () => {
    const mockNiveis: Nivel[] = [
      new Nivel({ id: 1, nivel: "Júnior 1" }),
      new Nivel({ id: 2, nivel: "Júnior 2" }),
      new Nivel({ id: 3, nivel: "Pleno 1" }),
      new Nivel({ id: 4, nivel: "Pleno 2" }),
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create(nivel);
    });

    const findAllNivelUseCase = new FindAllNivelUseCase(nivelRepository);

    const searchTerm = 'junior';

    const result = await findAllNivelUseCase.execute({
      page: 1,
      limit: 10,
      searchTerm,
      orderKey: 'id',
      orderValue: 'ASC'
    });

    expect(result.data).toEqual([mockNiveis[0], mockNiveis[1]]);
    expect(result.meta).toEqual({
      total: 2,
      current_page: 1,
      per_page: 10,
      last_page: 1
    });
  });

  it("should return níveis sorted by the given orderKey and orderValue", async () => {
    const mockNiveis: Nivel[] = [
      new Nivel({ id: 1, nivel: "Pleno 1" }),
      new Nivel({ id: 2, nivel: "Junior 2" }),
      new Nivel({ id: 3, nivel: "Junior 1" }),
      new Nivel({ id: 4, nivel: "Pleno 2" }),
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create(nivel);
    });

    const findAllNivelUseCase = new FindAllNivelUseCase(nivelRepository);

    const resultAsc = await findAllNivelUseCase.execute({
      page: 1,
      limit: 10,
      orderKey: 'nivel',
      orderValue: 'ASC'
    });

    expect(resultAsc.data).toEqual([
      mockNiveis[2],
      mockNiveis[1],
      mockNiveis[0],
      mockNiveis[3],
    ]);

    const resultDesc = await findAllNivelUseCase.execute({
      page: 1,
      limit: 10,
      orderKey: 'nivel',
      orderValue: 'DESC'
    });

    expect(resultDesc.data).toEqual([
      mockNiveis[3],
      mockNiveis[0],
      mockNiveis[1],
      mockNiveis[2],
    ]);

    const resultIdAsc = await findAllNivelUseCase.execute({
      page: 1,
      limit: 10,
      orderKey: 'id',
      orderValue: 'ASC'
    });

    expect(resultIdAsc.data).toEqual([
      mockNiveis[0],
      mockNiveis[1],
      mockNiveis[2],
      mockNiveis[3],
    ]);

    const resultIdDesc = await findAllNivelUseCase.execute({
      page: 1,
      limit: 10,
      orderKey: 'id',
      orderValue: 'DESC'
    });

    expect(resultIdDesc.data).toEqual([
      mockNiveis[3],
      mockNiveis[2],
      mockNiveis[1],
      mockNiveis[0],
    ]);
  });


});