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

  public async findAllWithNivel({ skip, take, searchTerm, orderKey, orderValue }: FindAllDesenvolvedorDto): Promise<DesenvolvedorWithNivelDto[]> {
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

  public async findById(id: number): Promise<Desenvolvedor | null> {
    const desenvolvedor = this.desenvolvedores.find(dev => dev.id === id);

    return desenvolvedor ?? null;
  }

  public async exitsById(id: number): Promise<boolean> {
    const desenvolvedorExits = this.desenvolvedores.find(dev => dev.id === id);

    return Boolean(desenvolvedorExits);
  }

  public async exitsByNivelId(nivelId: number): Promise<boolean> {
    const desenvolvedorExits = this.desenvolvedores.find(dev => dev.nivelId === nivelId);

    return Boolean(desenvolvedorExits)
  }

  public async update({ id, dataNascimento, hobby, nivelId, nome, sexo }: Desenvolvedor): Promise<Desenvolvedor> {
    const desenvolvedorIndex = this.desenvolvedores.findIndex(dev => dev.id === id);

    const updatedDesenvolvedor = new Desenvolvedor({
      id,
      nome,
      dataNascimento,
      hobby,
      nivelId,
      sexo
    });

    this.desenvolvedores[desenvolvedorIndex] = updatedDesenvolvedor;

    return updatedDesenvolvedor;
  }

  public async delete(id: number): Promise<void> {
    const desenvolvedorIndex = this.desenvolvedores.findIndex(nivel => nivel.id === id);

    const numberOfElementsToDelete = 1;

    this.desenvolvedores.splice(desenvolvedorIndex, numberOfElementsToDelete);
  }
}