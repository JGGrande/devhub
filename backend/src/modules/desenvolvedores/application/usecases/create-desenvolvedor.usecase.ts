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

    const age = this.differenceInYears(new Date(), dataNascimento);
    if (age < 16) {
      throw new AppError("Desenvolvedor deve ter 16 anos ou mais", 400);
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

  private differenceInYears(date1: Date, date2: Date): number {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
}