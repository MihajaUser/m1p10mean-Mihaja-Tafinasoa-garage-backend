export class HttpException extends Error {
  constructor(status, message) {
    super(status, message);
    this.name = "HttpException";
  }
}
