export interface Reservation {
  id: number;
  guestId: number;
  externalReference: string;
  totalPrice: number;
  paymentStatus: string;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  updatedAt: string;
}

export class Reservation {
  id: number;
  guestId: number;
  externalReference: string;
  totalPrice: number;
  paymentStatus: string;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  updatedAt: string;

  constructor(reservation: Reservation) {
    this.id = reservation.id;
    this.guestId = reservation.guestId;
    this.externalReference = reservation.externalReference;
    this.totalPrice = reservation.totalPrice;
    this.paymentStatus = reservation.paymentStatus;
    this.checkInDate = reservation.checkInDate;
    this.checkOutDate = reservation.checkOutDate;
    this.createdAt = reservation.createdAt;
    this.updatedAt = reservation.updatedAt;
  }
}
