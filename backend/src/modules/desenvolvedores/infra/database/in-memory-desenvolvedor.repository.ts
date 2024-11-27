import { injectable } from "inversify";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";

@injectable()
export class InMemoryDesenvolvedorRepository implements IDesenvolvedorRepository {
  private readonly desenvolvedores: Desenvolvedor[] = [];

  public async create({ nome, dataNascimento, hobby, nivelId, sexo }: CreateDesenvolvedorDto): Promise<Desenvolvedor> {
    const desenvolvedor = new Desenvolvedor({
      id: this.desenvolvedores.length + 1,
      nome,
      dataNascimento,
      hobby,
      nivelId,
      sexo
    });

    this.desenvolvedores.push(desenvolvedor);

    return desenvolvedor;
  }
}