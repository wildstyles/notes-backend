export abstract class ErrorBase extends Error {
  abstract readonly code: string;

  constructor(readonly message: string) {
    super(message);
  }
}
