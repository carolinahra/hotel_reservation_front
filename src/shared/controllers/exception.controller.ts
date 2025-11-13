import { ExceptionService } from "@shared/services/exception.service";
interface ErrorResponse {
  httpCode: number;
  errorMessage: string;
}

export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  public init(errorResponse: ErrorResponse) {
    return this.exceptionService.render(errorResponse);
  }
}
