import { Exception } from "@shared/exception";
import { ExceptionService } from "./exception.service";

export interface HTTPConfig {
  url: string;
}

export class HTTPService {
  constructor(
    private config: HTTPConfig,
    private readonly exceptionService: ExceptionService
  ) {}
  public get<Result>(
    path: string,
    params: Record<string, any>
  ): Promise<Result> {
    const query = new URLSearchParams(params);

    return fetch(`${this.config.url}/${path}?${query}`, {})
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Exception({
            httpCode: body.httpCode,
            errorMessage: body.errorMessage,
          });
        }
        return body;
      })
      .then((response) => {
        return response;
      });
  }

  public post<Result>(
    path: string,
    params: Record<string, any>
  ): Promise<Result> {
    return fetch(`${this.config.url}/${path}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Exception({
            httpCode: body.httpCode,
            errorMessage: body.errorMessage,
          });
        }
        return body;
      })
      .catch((error) => {
        console.log(error);
        this.exceptionService.handle(error);
      });
  }

  public put<Result>(
    path: string,
    params: Record<string, any>
  ): Promise<Result> {
    return fetch(`${this.config.url}/${path}`, {
      method: "PUT",
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        this.exceptionService.handle(error);
      });
  }

  public delete<Result>(
    path: string,
    params: Record<string, any>
  ): Promise<Result> {
    return fetch(`${this.config.url}/${path}`, {
      method: "DELETE",
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        this.exceptionService.handle(error);
      });
  }
}
