export interface ReservationDetail {
  id: number;
  reservationId: number;
  roomId: number;
  extraServiceId: number;
}

export class ReservationDetail {
  id: number;
  reservationId: number;
  roomId: number;
  extraServiceId: number;

  constructor(reservationDetail: ReservationDetail) {
    this.id = reservationDetail.id;
    this.reservationId = reservationDetail.reservationId;
    this.roomId = reservationDetail.roomId;
    this.extraServiceId = reservationDetail.extraServiceId;
  }
}
