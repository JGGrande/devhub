import { injectable } from "inversify";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";
import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { FindAllDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/find-all-desenvolvedor.dto";
import { DesenvolvedorWithNivelDto } from "@modules/desenvolvedores/application/dtos/desenvolvedor-with-nivel.dto";

@injectable()
export class InMemoryDesenvolvedorRepository implements IDesenvolvedorRepository {
  private readonly desenvolvedores: Desenvolvedor[] = [];
  private readonly niveis: Nivel[] = [];

  public async insertNivel(nivel: string): Promise<void> {
    const nivelInstance = new Nivel({
      id: this.niveis.length + 1,
      nivel
    });

    this.niveis.push(nivelInstance);
  }

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

  public async findAllWithNivel({ skip, take, searchTerm }: FindAllDesenvolvedorDto): Promise<DesenvolvedorWithNivelDto[]> {
    let filteredDesenvolvedores: Desenvolvedor[] | DesenvolvedorWithNivelDto[] = this.desenvolvedores;

    if (searchTerm) {
      const normalizeString = (str: string) => str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      const normalizedSearchTerm = normalizeString(searchTerm);

      filteredDesenvolvedores = filteredDesenvolvedores.filter(({ nome }) =>
        normalizeString(nome).includes(normalizedSearchTerm)
      );
    }

    filteredDesenvolvedores = filteredDesenvolvedores.map<DesenvolvedorWithNivelDto>(desenvolvedor => {
      const nivel = this.niveis.find(nivel => nivel.id === desenvolvedor.nivelId);

      return {
        id: desenvolvedor.id,
        nome: desenvolvedor.nome,
        dataNascimento: desenvolvedor.dataNascimento,
        hobby: desenvolvedor.hobby,
        sexo: desenvolvedor.sexo,
        nivel: {
          id: nivel!.id,
          nivel: nivel!.nivel
        }
      };
    });

    return filteredDesenvolvedores.slice(skip, skip + take) as DesenvolvedorWithNivelDto[];
  }

  public async count(searchTerm?: string): Promise<number> {
    if (!searchTerm) {
      return this.desenvolvedores.length;
    }

    const normalizeString = (str: string) => str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    const normalizedSearchTerm = normalizeString(searchTerm);

    const filteredDesenvolvedores = this.desenvolvedores.filter(({ nome }) =>
      normalizeString(nome).includes(normalizedSearchTerm)
    );

    return filteredDesenvolvedores.length;
  }
}