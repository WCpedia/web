export class ApiError extends Error {
  errorCode: string;
  statusCode: number;

  constructor(statusCode: number, errorCode: string, message?: string) {
    super(message);
    this.name = "ApiError";
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
