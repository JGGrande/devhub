import "reflect-metadata";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteNivelUseCase } from "./delete-nivel.usecase";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";
import { nivelTestContainer } from "@modules/niveis/infra/di/nivel.test.container";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

describe("DeleteNivelUseCase", () => {
  let nivelRepository: INivelRepository;
  let desenvolvedorRepository: IDesenvolvedorRepository;

  beforeEach(() => {
    nivelRepository = nivelTestContainer.get<INivelRepository>("NivelRepository");
    desenvolvedorRepository = nivelTestContainer.get<IDesenvolvedorRepository>("DesenvolvedorRepository");
  });

  it("should delete a nivel if it exists", async () => {
    const nivel = "Pleno 1";

    const nivelCreated = await nivelRepository.create({ nivel });

    const deleteNivelUseCase = new DeleteNivelUseCase(nivelRepository, desenvolvedorRepository);

    await expect(
      deleteNivelUseCase.execute(nivelCreated.id)
    ).resolves.not.toThrow();
  });

  it("should throw an error if the nivel does not exist", async () => {
    const deleteNivelUseCase = new DeleteNivelUseCase(nivelRepository, desenvolvedorRepository);

    try {
      const nivelId = 1;

      await deleteNivelUseCase.execute(nivelId);
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
    }
  });

  it("should throw an error if the nivel have some desenvolvedor using", async () => {
    const nivel = "Pleno 1";

    const nivelCreated = await nivelRepository.create({ nivel });

    const desenvolvedor = new Desenvolvedor({
      id: 1,
      nome: "Desenvolvedor 1",
      dataNascimento: new Date("1996-01-01"),
      hobby: "Programar",
      sexo: "M",
      nivelId: nivelCreated.id
    });

    desenvolvedorRepository.create(desenvolvedor);

    const deleteNivelUseCase = new DeleteNivelUseCase(nivelRepository, desenvolvedorRepository);

    try{
      await deleteNivelUseCase.execute(nivelCreated.id);
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 409);
    }
  });
});