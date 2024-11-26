import { inject, injectable } from "inversify";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { Nivel } from "@modules/niveis/domain/entities/nivel";

@injectable()
export class CreateNivelUseCase {
  constructor(
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ){ }

  public async execute(nivel: string): Promise<Nivel> {
    const nivelCreated = await this.nivelRepository.create({ nivel });

    return nivelCreated;
  }
}