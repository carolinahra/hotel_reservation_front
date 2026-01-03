import { Guest } from "@guest/models/guest";
import { HTTPService } from "@shared/services/http.service";

interface GetGuestConfig {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  limit?: number;
  offset?: number;
  filter?: boolean;
}

interface CreateGuestConfig {
  name: string;
  phone: string;
  email: string;
}

interface UpdateGuestConfig {
  id: number;
  phone?: string;
  name?: string;
  email?: string;
}

interface DeleteGuestConfig {
  phone?: string;
  email?: string;
}
export class GuestService {
  constructor(private readonly httpService: HTTPService) {}
  get(getStudentConfig: GetGuestConfig): Promise<Guest[]> {
    return this.httpService
      .get<Guest[]>("guests", getStudentConfig)
      .then((guests) => guests.map((guest) => new Guest(guest)));
  }

  create(createGuestConfig: CreateGuestConfig) {
    return this.httpService
      .post<Guest>("guests", createGuestConfig)
      .then((guest) => new Guest(guest));
  }

  update(updateGuestConfig: UpdateGuestConfig) {
    return this.httpService
      .put<Guest>("guests", updateGuestConfig)
      .then((guest) => new Guest(guest));
  }

  delete(deleteGuestConfig: DeleteGuestConfig): Promise<boolean> {
    return this.httpService.delete<boolean>("guests", deleteGuestConfig);
  }
}
