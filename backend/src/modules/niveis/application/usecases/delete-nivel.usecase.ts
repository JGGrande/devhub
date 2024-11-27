import { inject, injectable } from "inversify";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import AppError from "@shared/errors/AppError";

@injectable()
export class DeleteNivelUseCase {
  constructor(
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository,
    @inject("DesenvolvedorRepository")
    private readonly desenvolvedorRepository: IDesenvolvedorRepository
  ){ }

  public async execute(id: number): Promise<void> {
    const nivelExits = await this.nivelRepository.exitsById(id);

    if(!nivelExits){
      throw new AppError("Nível não encontrado.", 404);
    }

    const someDesenvolvedorHaveNivel = await this.desenvolvedorRepository.exitsByNivelId(id);

    if(someDesenvolvedorHaveNivel){
      throw new AppError("Não é possível apagar nível pois existem desenvolvedores associados.", 409);
    }

    await this.nivelRepository.delete(id);
  }
}