import { Room } from "@room/models/room";
import { HTTPService } from "@shared/services/http.service";

interface GetRoomConfig {
  id?: number;
  name?: string;
  roomSizeId?: number;
  limit?: number;
  offset?: number;
}

interface CreateRoomConfig {
  name: string;
  roomSizeId: number;
  price: number;
  availability: string;
}

interface UpdateRoomConfig {
  name: string;
  availability?: string;
  price?: number;
}

interface DeleteRoomConfig {
  name: string;
}
export class RoomService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<Room[]>;
  get(getStudentConfig: GetRoomConfig): Promise<Room | Room[]> {
    return this.httpService
      .get<Room[]>("rooms", getStudentConfig)
      .then((rooms) => rooms.map((room) => new Room(room)));
  }

  create(createRoomConfig: CreateRoomConfig) {
    return this.httpService
      .post<Room>("rooms", createRoomConfig)
      .then((room) => new Room(room));
  }

  update(updateRoomConfig: UpdateRoomConfig) {
    return this.httpService
      .put<Room>("rooms", updateRoomConfig)
      .then((room) => new Room(room));
  }

  delete(deleteRoomConfig: DeleteRoomConfig): Promise<boolean> {
    return this.httpService.delete<boolean>("rooms", deleteRoomConfig);
  }
}
