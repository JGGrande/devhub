import { inject, injectable } from "inversify";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";

@injectable()
export class DeleteNivelUseCase {
  constructor(
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ){ }

  public async execute(id: number): Promise<void> {
    const nivelExits = await this.nivelRepository.exitsById(id);

    if(!nivelExits){
      throw new AppError("Nível não encontrado.", 404);
    }

    await this.nivelRepository.delete(id);
  }
}