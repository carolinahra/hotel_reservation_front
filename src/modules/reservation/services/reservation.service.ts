import { Reservation } from "@reservation/models/reservation";
import { HTTPService } from "@shared/services/http.service";

interface GetReservationConfig {
  id?: number;
  externalReference?: string;
  guestId?: number;
  checkInDate?: string;
  limit?: number;
  offset?: number;
}

interface CreateReservationConfig {
  guestId: number;
  externalReference: string;
  totalPrice: number;
  paymentStatus: string;
  checkInDate: string;
  checkOutDate: string;
}

interface UpdateReservationConfig {
  externalReference: string;
  paymentStatus?: string;
  checkInDate?: string;
  checkoutDate?: string;
}

interface DeleteReservationConfig {
  externalReference: string;
}
export class ReservationService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<Reservation[]>;
  get(
    getStudentConfig: GetReservationConfig
  ): Promise<Reservation | Reservation[]> {
    return this.httpService
      .get<Reservation[]>("reservations", getStudentConfig)
      .then((reservations) =>
        reservations.map((reservation) => new Reservation(reservation))
      );
  }

  create(createReservationConfig: CreateReservationConfig) {
    return this.httpService
      .post<Reservation>("reservations", createReservationConfig)
      .then((reservation) => new Reservation(reservation));
  }

  update(updateReservationConfig: UpdateReservationConfig) {
    return this.httpService
      .put<Reservation>("reservations", updateReservationConfig)
      .then((reservation) => new Reservation(reservation));
  }

  delete(deleteReservationConfig: DeleteReservationConfig): Promise<boolean> {
    return this.httpService.delete<boolean>(
      "reservations",
      deleteReservationConfig
    );
  }
}
