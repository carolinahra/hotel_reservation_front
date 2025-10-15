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
export class GuestService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<Guest[]>;
  get(getStudentConfig: GetGuestConfig): Promise<Guest | Guest[]> {
    return this.httpService
      .get<Guest[]>("customers", getStudentConfig)
      .then((guests) => guests.map((guest) => new Guest(guest)));
  }

  create(createGuestConfig: CreateGuestConfig) {
    return this.httpService
      .post<Guest>("customers", createGuestConfig)
      .then((guest) => new Guest(guest));
  }
}
