import { inject, injectable } from "inversify";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";
import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { PaginatedContent } from "@shared/@types/pagination";
import { getPaginationMeta } from "@shared/functions/pagination";

type FindAllNivelUseCaseProps = {
  page: number;
  limit: number;
}

@injectable()
export class FindAllNivelUseCase {
  constructor(
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ){ }

  public async execute({ page, limit }: FindAllNivelUseCaseProps): Promise<PaginatedContent<Nivel>>{
    const skip = (page - 1) * limit;

    const [ niveis, totalNiveis ] = await Promise.all([
      this.nivelRepository.findAll({
        skip,
        take: limit
      }),
      this.nivelRepository.count()
    ])

    const niveisIsEmpty = totalNiveis === 0;

    if(niveisIsEmpty){
      throw new AppError("Nenhum nível encontrado.", 404);
    }

    const meta = getPaginationMeta({
      total: totalNiveis,
      limit,
      page
    });

    return {
      data: niveis,
      meta
    };
  }
}