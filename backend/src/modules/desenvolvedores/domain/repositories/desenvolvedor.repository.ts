import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";
import { Desenvolvedor } from "../entities/desenvolvedor.entity";

export interface IDesenvolvedorRepository {
  create({}: CreateDesenvolvedorDto): Promise<Desenvolvedor>;
}