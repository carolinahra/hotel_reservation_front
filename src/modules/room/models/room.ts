export interface Room {
  id: number;
  name: string;
  roomSizeId: number;
  price: number;
  availability: string;
  createdAt: string;
  updatedAt: string;
}

export class Room {
  id: number;
  name: string;
  roomSizeId: number;
  price: number;
  availability: string;
  createdAt: string;
  updatedAt: string;

  constructor(room: Room) {
    this.id = room.id;
    this.name = room.name;
    this.roomSizeId = room.roomSizeId;
    this.price = room.price;
    this.availability = room.availability;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}
