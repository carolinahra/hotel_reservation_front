interface ExceptionProps {
  httpCode: number;
  errorMessage: string;
}

export class Exception {
  public httpCode: number;
  public errorMessage: string;
  constructor(props: ExceptionProps) {
    this.httpCode = props.httpCode;
    this.errorMessage = props.errorMessage;
  }
}
