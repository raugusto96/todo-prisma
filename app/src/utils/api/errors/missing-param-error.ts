export class MissingParamError extends Error {
  constructor() {
    super("Parametros obrigatórios");
    this.name = "MissingParamError";
  }
}
