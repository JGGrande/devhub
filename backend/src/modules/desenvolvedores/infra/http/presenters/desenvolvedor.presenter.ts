import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

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
}