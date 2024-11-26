import { inject, injectable } from "inversify";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";
import { Nivel } from "@modules/niveis/domain/entities/nivel";

@injectable()
export class FindAllNivelUseCase {
  constructor(
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ){ }

  public async execute(): Promise<Nivel[]>{
    const niveis = await this.nivelRepository.findAll();

    const niveisIsEmpty = niveis.length === 0;

    if(niveisIsEmpty){
      throw new AppError("Nenhum nível encontrado.", 404);
    }

    return niveis;
  }
}