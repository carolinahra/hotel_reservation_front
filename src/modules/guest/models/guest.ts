export interface Guest {
  id: number;
  name: string;
  phone: string;
  email: string;
}
export class Guest {
  id: number;
  name: string;
  phone: string;
  email: string;
  constructor(guest: Guest) {
    this.id = guest.id;
    this.name = guest.name;
    this.phone = guest.phone;
    this.email = guest.email;
  }
}
