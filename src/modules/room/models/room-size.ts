export interface RoomSize {
    id: number,
    name: string,
    size: string
}

export class RoomSize {
    constructor(roomSize: RoomSize){
        this.id = roomSize.id;
        this.name = roomSize.name;
        this.size = roomSize.size;
    }
}