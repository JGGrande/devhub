import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";
import { Desenvolvedor } from "../entities/desenvolvedor.entity";
import { FindAllDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/find-all-desenvolvedor.dto";
import { DesenvolvedorWithNivelDto } from "@modules/desenvolvedores/application/dtos/desenvolvedor-with-nivel.dto";

export interface IDesenvolvedorRepository {
  create({}: CreateDesenvolvedorDto): Promise<Desenvolvedor>;
  findAllWithNivel({}: FindAllDesenvolvedorDto): Promise<DesenvolvedorWithNivelDto[]>;
  count(searchTerm?: string): Promise<number>;
}