import { inject, injectable } from "inversify";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import AppError from "@shared/errors/AppError";

@injectable()
export class DeleteDesenvolvedorUseCase {
  constructor(
    @inject("DesenvolvedorRepository")
    private readonly desenvolvedorRepository: IDesenvolvedorRepository
  ) { }

  public async execute(id: number): Promise<void> {
    const desenvolvedorExits = await this.desenvolvedorRepository.exitsById(id);

    if(!desenvolvedorExits){
      throw new AppError("Desenvolvedor não encontrado.", 404);
    }

    await this.desenvolvedorRepository.delete(id);
  }
}