import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

export type DesenvolvedorKeysToOrder = keyof Omit<Desenvolvedor, "nivelId" | "dataNascimento"> | 'nivel_nome' | 'data_nascimento';

export type FindAllDesenvolvedorDto = {
  skip: number;
  take: number;
  searchTerm?: string;
  orderKey: DesenvolvedorKeysToOrder;
  orderValue: 'ASC' | 'DESC';
}