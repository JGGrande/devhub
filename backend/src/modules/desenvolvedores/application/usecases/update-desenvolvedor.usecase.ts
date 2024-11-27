import { inject, injectable } from "inversify";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import AppError from "@shared/errors/AppError";

type UpdateDesenvolvedorUseCaseProps = {
  id: number;
  nivelId: number;
  nome: string;
  sexo: string
  dataNascimento: Date;
  hobby: string;
}

@injectable()
export class UpdateDesenvolvedorUseCase {
  constructor(
    @inject("DesenvolvedorRepository")
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
    @inject("NivelRepository")
    private readonly nivelRepository: INivelRepository
  ) { }

  public async execute({ id, dataNascimento, hobby, nivelId, nome, sexo }: UpdateDesenvolvedorUseCaseProps): Promise<Desenvolvedor>{
    const nivelExits = await this.nivelRepository.exitsById(nivelId);

    if (!nivelExits) {
      throw new AppError("Nível não encontrado", 404);
    }

    const desenvolvedor = await this.desenvolvedorRepository.findById(id);

    if(!desenvolvedor){
      throw new AppError("Desenvolvedor não encontrado", 404);
    }

    desenvolvedor.nome = nome;
    desenvolvedor.dataNascimento = dataNascimento;
    desenvolvedor.hobby = hobby;
    desenvolvedor.sexo = sexo;
    desenvolvedor.nivelId = nivelId;

    const desenvolvedorUpdated = await this.desenvolvedorRepository.update(desenvolvedor);

    return desenvolvedorUpdated;
  }
}