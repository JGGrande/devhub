import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { DeleteDesenvolvedorUseCase } from "./delete-desenvolvedor.usecase";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import AppError from "@shared/errors/AppError";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { desenvolvedorTestContainer } from "@modules/desenvolvedores/infra/di/desenvolvedor.test.container";
import { InMemoryDesenvolvedorRepository } from "@modules/desenvolvedores/infra/database/in-memory-desenvolvedor.repository";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

describe("DeleteDesenvolvedorUseCase", () => {
  let desenvolvedorRepository: IDesenvolvedorRepository;
  let nivelRepository: INivelRepository;
  let deleteDesenvolvedorUseCase: DeleteDesenvolvedorUseCase;

  beforeEach(() => {
    desenvolvedorRepository = desenvolvedorTestContainer.get<IDesenvolvedorRepository>("DesenvolvedorRepository");
    nivelRepository = desenvolvedorTestContainer.get<INivelRepository>("NivelRepository");

    deleteDesenvolvedorUseCase = new DeleteDesenvolvedorUseCase(desenvolvedorRepository);
  });

  it("should delete a desenvolvedor if it exists", async () => {
    nivelRepository.create({ nivel: "Junior 1" });

    (desenvolvedorRepository as InMemoryDesenvolvedorRepository).insertNivel("Junior 1");

    const desenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 1",
      dataNascimento: new Date("1996-01-01"),
      hobby: "Programar",
      sexo: "M",
      nivelId: 1
    });

    desenvolvedorRepository.create(desenvolvedor);

    await expect(
      deleteDesenvolvedorUseCase.execute(desenvolvedor.id)
    ).resolves.not.toThrow();
  });

  it("should throw an error if the desenvolvedor does not exist", async () => {
    try {
      await deleteDesenvolvedorUseCase.execute(1)
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
    }
  });
});