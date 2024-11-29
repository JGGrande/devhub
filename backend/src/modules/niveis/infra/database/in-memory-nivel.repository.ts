import { injectable } from "inversify";
import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";
import { FindAllNivelDto } from "@modules/niveis/application/dtos/find-all-nivel.dto";

@injectable()
export class InMemoryNivelRepository implements INivelRepository {
  private readonly niveis: Nivel[] = [];

  public async create({ nivel }: CreateNivelDto): Promise<Nivel> {
    const id = this.niveis.length + 1;

    const newNivel = new Nivel({
      id,
      nivel
    })

    this.niveis.push(newNivel);

    return newNivel;
  }

  public async findAll({ skip, take, searchTerm, orderKey, orderValue }: FindAllNivelDto): Promise<Nivel[]> {
    let filteredNiveis = this.niveis;

    if (searchTerm) {
      const normalizeString = (str: string) => str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      const normalizedSearchTerm = normalizeString(searchTerm);

      filteredNiveis = filteredNiveis.filter(({ nivel }) =>
        normalizeString(nivel).includes(normalizedSearchTerm)
      );
    }

    if (orderKey && orderValue) {
      filteredNiveis = filteredNiveis.sort((a, b) => {
        if (orderValue === 'ASC') {
          return a[orderKey] > b[orderKey] ? 1 : -1;
        }

        return a[orderKey] < b[orderKey] ? 1 : -1;
      });
    }

    return filteredNiveis.slice(skip, skip + take);
  }
  public async findById(id: number): Promise<Nivel | null> {
    const nivel = this.niveis.find(nivel => nivel.id === id);

    return nivel || null;
  }

  public async exitsById(id: number): Promise<boolean> {
    const nivelExits = this.niveis.find(nivel => nivel.id === id);

    return Boolean(nivelExits)
  }

  public async count(searchTerm?: string): Promise<number> {
    if (!searchTerm) {
      return this.niveis.length;
    }

    const normalizeString = (str: string) => str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    const normalizedSearchTerm = normalizeString(searchTerm);

    const filteredNiveis = this.niveis.filter(({ nivel }) =>
      normalizeString(nivel).includes(normalizedSearchTerm)
    );

    return filteredNiveis.length;
  }

  public async update({ id, nivel }: Nivel): Promise<Nivel> {
    const nivelIndex = this.niveis.findIndex(nivel => nivel.id === id);

    this.niveis[nivelIndex].nivel = nivel;

    return this.niveis[nivelIndex];
  }

  public async delete(id: number): Promise<void> {
    const nivelIndex = this.niveis.findIndex(nivel => nivel.id === id);

    const numberOfElementsToDelete = 1;

    this.niveis.splice(nivelIndex, numberOfElementsToDelete);
  }
}