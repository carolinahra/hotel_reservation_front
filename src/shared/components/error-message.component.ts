interface ErrorResponse {
  httpCode: number;
  errorMessage: string;
}

export class ErrorMessageComponent {

  public generate(errorResponse: ErrorResponse) {
    const div = this.renderErrorMessage(errorResponse);
    setTimeout(() => 
      div.hidden = true, 3000);
    return div;
  }

  private renderErrorMessage(errorResponse: ErrorResponse): HTMLDivElement {
    const container = document.createElement("div");
    container.id = "error-container";
    const title = document.createElement("h1");
    title.textContent = String(errorResponse.httpCode);
    const message = document.createElement("p");
    message.textContent = errorResponse.errorMessage;
    container.append(title, message);
    return container;
  }
}
