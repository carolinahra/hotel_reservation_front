import { ReservationDetail } from "@reservation/models/reservation-detail";
import { HTTPService } from "@shared/services/http.service";

interface GetReservationDetailConfig {
  id?: number;
  reservationId?: number;
  roomId?: number;
  extraServiceId?: number;
  limit?: number;
  offset?: number;
}

interface CreateReservationDetailConfig {
  reservationId?: number;
  roomId?: number;
  extraServiceId?: number;
}

interface UpdateReservationDetailConfig {
  reservationId: number;
  roomId: number;
  extraServiceId: number;
}

interface DeleteReservationDetailConfig {
  id: number;
}
export class ReservationDetailService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<ReservationDetail[]>;
  get(
    getStudentConfig: GetReservationDetailConfig
  ): Promise<ReservationDetail | ReservationDetail[]> {
    return this.httpService
      .get<ReservationDetail[]>("reservationDetails", getStudentConfig)
      .then((reservationDetails) =>
        reservationDetails.map(
          (reservationDetail) => new ReservationDetail(reservationDetail)
        )
      );
  }

  create(createReservationDetailConfig: CreateReservationDetailConfig) {
    return this.httpService
      .post<ReservationDetail>(
        "reservationDetails",
        createReservationDetailConfig
      )
      .then((reservationDetail) => new ReservationDetail(reservationDetail));
  }

  update(updateReservationDetailConfig: UpdateReservationDetailConfig) {
    return this.httpService
      .put<ReservationDetail>(
        "reservationDetails",
        updateReservationDetailConfig
      )
      .then((reservationDetail) => new ReservationDetail(reservationDetail));
  }

  delete(
    deleteReservationDetailConfig: DeleteReservationDetailConfig
  ): Promise<boolean> {
    return this.httpService.delete<boolean>(
      "reservationDetails",
      deleteReservationDetailConfig
    );
  }
}
