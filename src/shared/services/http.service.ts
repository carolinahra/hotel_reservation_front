export interface HTTPConfig {
  url: string;
}

export class HTTPService {
  constructor(private config: HTTPConfig) {}
  public get<Result>(
    path: string,
    params: Record<string, any>
  ): Promise<Result> {
    const query = new URLSearchParams(params);

    return fetch(`${this.config.url}/${path}?${query}`, {})
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error);
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
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        throw new Error();
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
        "Content-type": "application/json; charset=UTF8",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        throw new Error();
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
        throw new Error();
      });
  }
}
