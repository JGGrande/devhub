import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { FindAllDesenvolvedorUseCase } from "./find-all-desenvolvedor.usecase";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { desenvolvedorTestContainer } from "@modules/desenvolvedores/infra/di/desenvolvedor.test.container";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { InMemoryDesenvolvedorRepository } from "@modules/desenvolvedores/infra/database/in-memory-desenvolvedor.repository";
import AppError from "@shared/errors/AppError";

describe("FindAllDesenvolvedorUseCase", () => {
  let findAllDesenvolvedorUseCase: FindAllDesenvolvedorUseCase;
  let desenvolvedorRepository: IDesenvolvedorRepository;
  let nivelRepository: INivelRepository;

  beforeEach(() => {
    desenvolvedorRepository = desenvolvedorTestContainer.get<IDesenvolvedorRepository>("DesenvolvedorRepository");
    nivelRepository = desenvolvedorTestContainer.get<INivelRepository>("NivelRepository");

    findAllDesenvolvedorUseCase = new FindAllDesenvolvedorUseCase(desenvolvedorRepository);
  });

  it("should return all desenvolvedores when they exist", async () => {
    const mockNiveis = [
      "Junior 1",
      "Junior 2",
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create({ nivel });

      (desenvolvedorRepository as InMemoryDesenvolvedorRepository).insertNivel(nivel);
    });

    const mockDesenvolvedores: Desenvolvedor[] = [
      new Desenvolvedor({
        id: 1,
        nome: "Desenvolvedor 1",
        dataNascimento: new Date("1996-01-01"),
        hobby: "Programar",
        sexo: "M",
        nivelId: 1
      }),
      new Desenvolvedor({
        id: 2,
        nome: "Desenvolvedor 2",
        dataNascimento: new Date("2004-12-18"),
        hobby: "Programar",
        sexo: "F",
        nivelId: 2
      }),
    ];

    mockDesenvolvedores.forEach(desenvolvedor => {
      desenvolvedorRepository.create(desenvolvedor);
    });

    const result = await findAllDesenvolvedorUseCase.execute({ page: 1, limit: 10 });

    const expectedDesenvolvedoresResult = [
      {
        id: mockDesenvolvedores[0].id,
        nome: mockDesenvolvedores[0].nome,
        dataNascimento: mockDesenvolvedores[0].dataNascimento,
        hobby: mockDesenvolvedores[0].hobby,
        sexo: mockDesenvolvedores[0].sexo,
        nivel: {
          id: 1,
          nivel: mockNiveis[0]
        }
      },
      {
        id: mockDesenvolvedores[1].id,
        nome: mockDesenvolvedores[1].nome,
        dataNascimento: mockDesenvolvedores[1].dataNascimento,
        hobby: mockDesenvolvedores[1].hobby,
        sexo: mockDesenvolvedores[1].sexo,
        nivel: {
          id: 2,
          nivel: mockNiveis[1]
        }
      }
    ];

    expect(result.data).toEqual([
      expectedDesenvolvedoresResult[0],
      expectedDesenvolvedoresResult[1]
    ]);
  });

  it("should throw an error when no desenvolvedores are found", async () => {
    try {
      await findAllDesenvolvedorUseCase.execute({ page: 1, limit: 10 });

    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it("should return paginated desenvolvedores", async () => {
    const mockNiveis = [
      "Junior 1",
      "Junior 2",
      "Pleno 1",
      "Pleno 2",
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create({ nivel });

      (desenvolvedorRepository as InMemoryDesenvolvedorRepository).insertNivel(nivel);
    });

    const mockDesenvolvedores: Desenvolvedor[] = [
      new Desenvolvedor({
        id: 1,
        nome: "Desenvolvedor 1",
        dataNascimento: new Date("1996-01-01"),
        hobby: "Programar",
        sexo: "M",
        nivelId: 1
      }),
      new Desenvolvedor({
        id: 2,
        nome: "Desenvolvedor 2",
        dataNascimento: new Date("2004-12-18"),
        hobby: "Programar",
        sexo: "F",
        nivelId: 2
      }),
      new Desenvolvedor({
        id: 3,
        nome: "Desenvolvedor 3",
        dataNascimento: new Date("1996-01-01"),
        hobby: "Programar",
        sexo: "M",
        nivelId: 3
      }),
      new Desenvolvedor({
        id: 4,
        nome: "Desenvolvedor 4",
        dataNascimento: new Date("2004-12-18"),
        hobby: "Programar",
        sexo: "F",
        nivelId: 4
      }),
    ];

    mockDesenvolvedores.forEach(desenvolvedor => {
      desenvolvedorRepository.create(desenvolvedor);
    });

    const resultPage1 = await findAllDesenvolvedorUseCase.execute({ page: 1, limit: 2 });
    const resultPage2 = await findAllDesenvolvedorUseCase.execute({ page: 2, limit: 2 });

    const expectedDesenvolvedoresResult = [
      {
        id: mockDesenvolvedores[0].id,
        nome: mockDesenvolvedores[0].nome,
        dataNascimento: mockDesenvolvedores[0].dataNascimento,
        hobby: mockDesenvolvedores[0].hobby,
        sexo: mockDesenvolvedores[0].sexo,
        nivel: {
          id: 1,
          nivel: mockNiveis[0]
        }
      },
      {
        id: mockDesenvolvedores[1].id,
        nome: mockDesenvolvedores[1].nome,
        dataNascimento: mockDesenvolvedores[1].dataNascimento,
        hobby: mockDesenvolvedores[1].hobby,
        sexo: mockDesenvolvedores[1].sexo,
        nivel: {
          id: 2,
          nivel: mockNiveis[1]
        }
      },
      {
        id: mockDesenvolvedores[2].id,
        nome: mockDesenvolvedores[2].nome,
        dataNascimento: mockDesenvolvedores[2].dataNascimento,
        hobby: mockDesenvolvedores[2].hobby,
        sexo: mockDesenvolvedores[2].sexo,
        nivel: {
          id: 3,
          nivel: mockNiveis[2]
        }
      },
      {
        id: mockDesenvolvedores[3].id,
        nome: mockDesenvolvedores[3].nome,
        dataNascimento: mockDesenvolvedores[3].dataNascimento,
        hobby: mockDesenvolvedores[3].hobby,
        sexo: mockDesenvolvedores[3].sexo,
        nivel: {
          id: 4,
          nivel: mockNiveis[3]
        }
      }
    ];

    expect(resultPage1.data).toEqual([
      expectedDesenvolvedoresResult[0],
      expectedDesenvolvedoresResult[1]
    ]);

    expect(resultPage1.meta).toEqual({
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2
    });

    expect(resultPage2.data).toEqual([
      expectedDesenvolvedoresResult[2],
      expectedDesenvolvedoresResult[3]
    ]);

    expect(resultPage2.meta).toEqual({
      total: 4,
      current_page: 2,
      per_page: 2,
      last_page: 2
    });
  });

  it("should return filtered desenvolvedores based on searchTerm", async () => {
    const mockNiveis = [
      "Júnior 1",
      "Júnior 2",
      "Pleno 1",
      "Pleno 2",
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create({ nivel });

      (desenvolvedorRepository as InMemoryDesenvolvedorRepository).insertNivel(nivel);
    });

    const mockDesenvolvedores: Desenvolvedor[] = [
      new Desenvolvedor({
        id: 1,
        nome: "Desenvolvedor 1",
        dataNascimento: new Date("1996-01-01"),
        hobby: "Programar",
        sexo: "M",
        nivelId: 1
      }),
      new Desenvolvedor({
        id: 2,
        nome: "Desenvolvedor 2",
        dataNascimento: new Date("2004-12-18"),
        hobby: "Programar",
        sexo: "F",
        nivelId: 2
      }),
      new Desenvolvedor({
        id: 3,
        nome: "Programador",
        dataNascimento: new Date("2004-12-18"),
        hobby: "Programar",
        sexo: "F",
        nivelId: 2
      })
    ];

    mockDesenvolvedores.forEach(desenvolvedor => {
      desenvolvedorRepository.create(desenvolvedor);
    });

    const searchTerm = 'desenvolvedor';

    const result = await findAllDesenvolvedorUseCase.execute({
      page: 1,
      limit: 10,
      searchTerm
    });

    const expectedDesenvolvedoresResult = [
      {
        id: mockDesenvolvedores[0].id,
        nome: mockDesenvolvedores[0].nome,
        dataNascimento: mockDesenvolvedores[0].dataNascimento,
        hobby: mockDesenvolvedores[0].hobby,
        sexo: mockDesenvolvedores[0].sexo,
        nivel: {
          id: 1,
          nivel: mockNiveis[0]
        }
      },
      {
        id: mockDesenvolvedores[1].id,
        nome: mockDesenvolvedores[1].nome,
        dataNascimento: mockDesenvolvedores[1].dataNascimento,
        hobby: mockDesenvolvedores[1].hobby,
        sexo: mockDesenvolvedores[1].sexo,
        nivel: {
          id: 2,
          nivel: mockNiveis[1]
        }
      }
    ];

    expect(result.data.length).toBe(2);
    expect(result.data).toEqual([expectedDesenvolvedoresResult[0], expectedDesenvolvedoresResult[1]]);
  });
});