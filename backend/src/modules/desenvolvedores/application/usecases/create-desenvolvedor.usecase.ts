import { inject, injectable } from "inversify";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import AppError from "@shared/errors/AppError";

type CreateDesenvolvedorUseCaseProps = {
  nivelId: number;
  nome: string;
  sexo: string
  dataNascimento: Date;
  hobby: string;
}

@injectable()
export class CreateDesenvolvedorUseCase {
  constructor(
    @inject("DesenvolvedorRepository")
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ) { }

  public async execute({ nome, dataNascimento, hobby, nivelId, sexo }: CreateDesenvolvedorUseCaseProps): Promise<Desenvolvedor> {
    const nivelExits = await this.nivelRepository.exitsById(nivelId);

    if (!nivelExits) {
      throw new AppError("Nível não encontrado", 404);
    }

    const desenvolvedor = await this.desenvolvedorRepository.create({
      nome,
      dataNascimento,
      hobby,
      nivelId,
      sexo
    });

    return desenvolvedor;
  }
}