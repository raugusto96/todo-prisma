export class UnexpectedError extends Error {
  constructor() {
    super("Algo inesperado ocorreu. Tente novamente em breve.");
    this.name = "UnexpectedError";
  }
}
