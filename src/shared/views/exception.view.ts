import { ErrorMessageComponent } from "@shared/components/error-message.component";
interface ErrorResponse {
  httpCode: number;
  errorMessage: string;
}

export class ExceptionView {
  private app = document.getElementById("app");
  constructor(private readonly errorMessageComponent: ErrorMessageComponent) {}

  public renderErrorMessage(errorResponse: ErrorResponse): void {
    const errorMessage =
      this.errorMessageComponent.generate(errorResponse);
    this.app.appendChild(errorMessage);
  }
}
