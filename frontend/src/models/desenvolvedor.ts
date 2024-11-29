export type Desenvolvedor = {
  id: number;
  nivel: {
    id: number;
    nivel: string;
  };
  nome: string;
  sexo: string;
  dataNascimento: Date;
  idade: number;
  hobby: string;
}

export type DesenolvedorResponse = {
  id: number;
  nivel: {
    id: number;
    nivel: string;
  }
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
}

export type DesenvolvedorCreate = {
  nivelId: number;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
}

export type DesenvolvedorUpdate = {
  id: number;
  nivelId: number;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
}
