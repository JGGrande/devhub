import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";
import { Desenvolvedor } from "../entities/desenvolvedor.entity";
import { FindAllDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/find-all-desenvolvedor.dto";
import { DesenvolvedorWithNivelDto } from "@modules/desenvolvedores/application/dtos/desenvolvedor-with-nivel.dto";

export interface IDesenvolvedorRepository {
  create({}: CreateDesenvolvedorDto): Promise<Desenvolvedor>;
  findAllWithNivel({}: FindAllDesenvolvedorDto): Promise<DesenvolvedorWithNivelDto[]>;
  count(searchTerm?: string): Promise<number>;
  findById(id: number): Promise<Desenvolvedor | null>;
  exitsById(id: number): Promise<boolean>;
  exitsByNivelId(nivelId: number): Promise<boolean>;
  update({}: Desenvolvedor): Promise<Desenvolvedor>;
  delete(id: number): Promise<void>;
}