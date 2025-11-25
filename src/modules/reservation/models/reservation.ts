export interface Reservation {
  id: number;
  guest_id: number;
  external_reference: string;
  total_price: number;
  payment_status: string;
  check_in_at: string;
  check_out_at: string;
  created_at: string;
  updated_at: string;
}

export class Reservation {
  id: number;
  guest_id: number;
  external_reference: string;
  total_price: number;
  payment_status: string;
  check_in_at: string;
  check_out_at: string;
  created_at: string;
  updated_at: string;

  constructor(reservation: Reservation) {
    this.id = reservation.id;
    this.guest_id = reservation.guest_id;
    this.external_reference = reservation.external_reference;
    this.total_price = reservation.total_price;
    this.payment_status = reservation.payment_status;
    this.check_in_at = reservation.check_in_at;
    this.check_out_at = reservation.check_out_at;
    this.created_at = reservation.created_at;
    this.updated_at = reservation.updated_at;
  }
}
