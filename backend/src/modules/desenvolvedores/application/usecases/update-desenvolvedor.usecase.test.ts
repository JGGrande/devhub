import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateDesenvolvedorUseCase } from "./update-desenvolvedor.usecase";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import AppError from "@shared/errors/AppError";
import { desenvolvedorTestContainer } from "@modules/desenvolvedores/infra/di/desenvolvedor.test.container";
import { InMemoryDesenvolvedorRepository } from "@modules/desenvolvedores/infra/database/in-memory-desenvolvedor.repository";

describe("UpdateDesenvolvedorUseCase", () => {
  let updateDesenvolvedorUseCase: UpdateDesenvolvedorUseCase;
  let desenvolvedorRepository: IDesenvolvedorRepository;
  let nivelRepository: INivelRepository;

  beforeEach(() => {
    desenvolvedorRepository = desenvolvedorTestContainer.get<IDesenvolvedorRepository>("DesenvolvedorRepository");
    nivelRepository = desenvolvedorTestContainer.get<INivelRepository>("NivelRepository");

    updateDesenvolvedorUseCase = new UpdateDesenvolvedorUseCase(desenvolvedorRepository, nivelRepository);
  });

  it("should update a desenvolvedor successfully", async () => {
    const mockNiveis = [
      "Junior 1",
      "Junior 2",
    ];

    mockNiveis.forEach(nivel => {
      nivelRepository.create({ nivel });

      (desenvolvedorRepository as InMemoryDesenvolvedorRepository).insertNivel(nivel);
    });

    const desenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 1",
      dataNascimento: new Date("1996-01-01"),
      hobby: "Programar",
      sexo: "M",
      nivelId: 1
    });

    desenvolvedorRepository.create(desenvolvedor);

    const updatedDesenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 2",
      dataNascimento: new Date("2004-12-18"),
      hobby: "Lutar",
      sexo: "F",
      nivelId: 2
    });

    const result = await updateDesenvolvedorUseCase.execute({
      id: desenvolvedor.id,
      nivelId: updatedDesenvolvedor.nivelId,
      nome: updatedDesenvolvedor.nome,
      sexo: updatedDesenvolvedor.sexo,
      dataNascimento: updatedDesenvolvedor.dataNascimento,
      hobby: updatedDesenvolvedor.hobby
    });

    expect(result).toBeInstanceOf(Desenvolvedor);
    expect(result).toEqual(updatedDesenvolvedor);
  });

  it("should throw an error if nivel does not exist", async () => {
    const desenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 1",
      dataNascimento: new Date("1996-01-01"),
      hobby: "Programar",
      sexo: "M",
      nivelId: 1
    });

    desenvolvedorRepository.create(desenvolvedor);

    const updatedDesenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 2",
      dataNascimento: new Date("2004-12-18"),
      hobby: "Lutar",
      sexo: "F",
      nivelId: 2
    });

    try{
      await updateDesenvolvedorUseCase.execute(updatedDesenvolvedor);
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it("should throw an error if desenvolvedor does not exist", async () => {
    const desenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 1",
      dataNascimento: new Date("1996-01-01"),
      hobby: "Programar",
      sexo: "M",
      nivelId: 1
    });

    try{
      await updateDesenvolvedorUseCase.execute(desenvolvedor);
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
    }
  });
});