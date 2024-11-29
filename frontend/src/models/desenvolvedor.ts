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
  dataNascimento: string;
  idade: number;
  hobby: string;
}