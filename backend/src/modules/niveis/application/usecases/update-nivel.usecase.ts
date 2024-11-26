import { inject, injectable } from "inversify";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";

@injectable()
export class UpdateNivelUseCase {
  constructor(
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ){ }

  async execute(id: number, nivel: string){
    const nivelAlreadyExits = await this.nivelRepository.findById(id);

    if(!nivelAlreadyExits){
      throw new AppError("Nível não encontrado.", 404);
    }

    nivelAlreadyExits.nivel = nivel;

    const nivelUpdated = await this.nivelRepository.update(nivelAlreadyExits);

    return nivelUpdated;
  }
}