import { DesenvolvedorWithNivelDto } from "@modules/desenvolvedores/application/dtos/desenvolvedor-with-nivel.dto";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { PaginatedContent } from "@shared/@types/pagination";

export class DesenvolvedorPresenter {
  static toHttpResponse(desenvolvedor: Desenvolvedor){
    return {
      id: desenvolvedor.id,
      nome: desenvolvedor.nome,
      nivel_id: desenvolvedor.nivelId,
      data_nascimento: desenvolvedor.dataNascimento,
      sexo: desenvolvedor.sexo,
      hobby: desenvolvedor.hobby
    };
  }

  static fromArrayToHttpResponse({ data, meta }: PaginatedContent<DesenvolvedorWithNivelDto>){
    return {
      data: data.map(desenvolvedor => ({
        id: desenvolvedor.id,
        nome: desenvolvedor.nome,
        data_nascimento: desenvolvedor.dataNascimento,
        sexo: desenvolvedor.sexo,
        hobby: desenvolvedor.hobby,
        nivel: desenvolvedor.nivel
      })),
      meta
    }
  }
}