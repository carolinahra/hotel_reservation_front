import { ExceptionView } from "@shared/views/exception.view";
interface ErrorResponse {
  httpCode: number;
  errorMessage: string;
}
export class ExceptionService {
  constructor(private readonly exceptionView: ExceptionView) {}

  public handle(errorResponse: ErrorResponse) {
    this.exceptionView.renderErrorMessage(errorResponse);
  }
}
