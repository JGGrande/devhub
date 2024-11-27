type DesenvolvedorProps = {
  id: number;
  nivelId: number;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
}

export class Desenvolvedor {
  private readonly _id: number;
  private _nivelId: number;
  private _nome: string;
  private _sexo: string;
  private _dataNascimento: Date;
  private _hobby: string;

  constructor({ id, nivelId, nome, sexo, dataNascimento, hobby }: DesenvolvedorProps) {
    this._id = id;
    this._nivelId = nivelId;
    this._nome = nome;
    this._sexo = sexo;
    this._dataNascimento = dataNascimento;
    this._hobby = hobby;
  }

  get id(): number {
    return this._id;
  }

  get nivelId(): number {
    return this._nivelId;
  }

  get nome(): string {
    return this._nome;
  }

  get sexo(): string {
    return this._sexo;
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  get hobby(): string {
    return this._hobby;
  }

  set nivelId(nivelId: number) {
    this._nivelId = nivelId;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  set sexo(sexo: string) {
    this._sexo = sexo;
  }

  set dataNascimento(dataNascimento: Date) {
    this._dataNascimento = dataNascimento;
  }

  set hobby(hobby: string) {
    this._hobby = hobby;
  }
}