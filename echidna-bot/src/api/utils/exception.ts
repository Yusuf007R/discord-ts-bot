export class CustomException extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'CustomException';
  }
}
