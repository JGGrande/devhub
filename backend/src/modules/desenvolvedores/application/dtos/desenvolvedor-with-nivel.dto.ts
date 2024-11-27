import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

export type DesenvolvedorWithNivelDto = Omit<Desenvolvedor, "nivelId"> & {
  nivel: {
    id: number;
    nivel: string;
  };
}