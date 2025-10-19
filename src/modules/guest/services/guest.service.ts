import { Guest } from "@guest/models/guest";
import { HTTPService } from "@shared/services/http.service";

interface GetGuestConfig {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  limit?: number;
  offset?: number;
}

interface CreateGuestConfig {
  name: string;
  phone: string;
  email: string;
}

interface UpdateGuestConfig {
  phone: string;
  name?: string;
  email?: string;
  newPhone?: string;
}

interface DeleteGuestConfig {
  phone?: string;
  email?: string;
}
export class GuestService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<Guest[]>;
  get(getStudentConfig: GetGuestConfig): Promise<Guest | Guest[]> {
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
