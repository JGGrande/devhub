type NivelProps = {
  id: number;
  nivel: string;
}

export class Nivel {
  private readonly _id: number;
  private _nivel: string;

  constructor({ id, nivel }: NivelProps) {
    this._id = id;
    this._nivel = nivel;
  }

  get id(): number {
    return this._id;
  }

  get nivel(): string {
    return this._nivel;
  }

  set nivel(nivel: string) {
    this._nivel = nivel;
  }
}