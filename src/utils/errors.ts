export class ErrorHandler {
  public message: string;
  public name: string;
  public data: null;
  public status: number;
  public errors: any;

  constructor(
    message = 'The request could not be understood or was missing any required parameters.',
    errors: any = null,
    name = 'Error',
    status = 400,
  ) {
    this.data = null;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.name = name;
  }
}

export class ValidationError extends ErrorHandler {
  constructor(
    message = 'The request was well-formed but was unable to be followed due to semantic errors.',
    errors: any = null,
    name = 'UNPROCESSABLE_ENTITY',
    status = 422,
  ) {
    super(message, errors, name, status);
    return this;
  }
}
