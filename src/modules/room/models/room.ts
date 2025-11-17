export interface Room {
  id: number;
  name: string;
  room_size_id: number;
  price: number;
  availability: string;
  created_at: string;
  updated_at: string;
}

export class Room {
  id: number;
  name: string;
  room_size_id: number;
  price: number;
  availability: string;
  created_at: string;
  updated_at: string;

  constructor(room: Room) {
    this.id = room.id;
    this.name = room.name;
    this.room_size_id = room.room_size_id;
    this.price = room.price;
    this.availability = room.availability;
    this.created_at = room.created_at;
    this.updated_at = room.updated_at;
  }
}
