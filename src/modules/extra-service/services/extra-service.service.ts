import { ExtraService } from "@extra-service/models/extra-service";
import { HTTPService } from "@shared/services/http.service";

interface GetExtraServiceConfig {
  id?: number;
  name?: string;
  price?: number;
  limit?: number;
  offset?: number;
}

interface CreateExtraServiceConfig {
  name: string;
  price: number;
}

interface UpdateExtraServiceConfig {
  name: string;
  price?: number;
  newPrice?: number;
}

interface DeleteExtraServiceConfig {
  name: string;
}
export class ExtraServiceService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<ExtraService[]>;
  get(
    getStudentConfig: GetExtraServiceConfig
  ): Promise<ExtraService | ExtraService[]> {
    return this.httpService
      .get<ExtraService[]>("extraServices", getStudentConfig)
      .then((extraServices) =>
        extraServices.map((extraService) => new ExtraService(extraService))
      );
  }

  create(createextraServiceConfig: CreateExtraServiceConfig) {
    return this.httpService
      .post<ExtraService>("extraServices", createextraServiceConfig)
      .then((extraService) => new ExtraService(extraService));
  }

  update(updateextraServiceConfig: UpdateExtraServiceConfig) {
    return this.httpService
      .put<ExtraService>("extraServices", updateextraServiceConfig)
      .then((extraService) => new ExtraService(extraService));
  }

  delete(deleteextraServiceConfig: DeleteExtraServiceConfig): Promise<boolean> {
    return this.httpService.delete<boolean>(
      "extraServices",
      deleteextraServiceConfig
    );
  }
}
