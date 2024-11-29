import { inject, injectable } from "inversify";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { PaginatedContent } from "@shared/@types/pagination";
import { DesenvolvedorWithNivelDto } from "../dtos/desenvolvedor-with-nivel.dto";
import { getPaginationMeta } from "@shared/functions/pagination";
import AppError from "@shared/errors/AppError";
import { DesenvolvedorKeysToOrder } from "../dtos/find-all-desenvolvedor.dto";

type FindAllDesenvolvedorUseCaseProps = {
  page: number;
  limit: number;
  searchTerm?: string;
  orderKey: DesenvolvedorKeysToOrder;
  orderValue: "ASC" | "DESC";
}

@injectable()
export class FindAllDesenvolvedorUseCase {
  constructor(
    @inject("DesenvolvedorRepository")
    private readonly desenvolvedorRepository: IDesenvolvedorRepository
  ) { }

  public async execute({ page, limit, searchTerm, orderKey, orderValue }: FindAllDesenvolvedorUseCaseProps): Promise<PaginatedContent<DesenvolvedorWithNivelDto>>{
    const skip = (page - 1) * limit;

    const [ desenvolvedores, totalDesenvolvedores ] = await Promise.all([
      this.desenvolvedorRepository.findAllWithNivel({
        skip,
        take: limit,
        searchTerm,
        orderKey,
        orderValue
      }),
      this.desenvolvedorRepository.count(searchTerm)
    ]);

    const desenvolvedoresIsEmpty = totalDesenvolvedores === 0;

    if(desenvolvedoresIsEmpty){
      throw new AppError("Nenhum desenvolvedor encontrado.", 404);
    }

    const meta = getPaginationMeta({
      total: totalDesenvolvedores,
      limit,
      page
    });

    return {
      data: desenvolvedores,
      meta
    };
  }
}