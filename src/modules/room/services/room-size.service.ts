import { RoomSize } from "@room/models/room-size";
import { HTTPService } from "@shared/services/http.service";

interface GetRoomSizeConfig {
  id?: number;
  name?: string;
  size?: string;
  limit?: number;
  offset?: number;
}

interface CreateRoomSizeConfig {
   name: string;
  size: string;
}

interface UpdateRoomSizeConfig {
 name: string;
  size?: string;
  newName?: string;
}

interface DeleteRoomSizeConfig {
  name: string;
}
export class RoomSizeService {
  constructor(private readonly httpService: HTTPService) {}
  get({ limit, offset }): Promise<RoomSize[]>;
  get(getStudentConfig: GetRoomSizeConfig): Promise<RoomSize | RoomSize[]> {
    return this.httpService
      .get<RoomSize[]>("roomSizes", getStudentConfig)
      .then((roomSizes) => roomSizes.map((roomSize) => new RoomSize(roomSize)));
  }

  create(createRoomSizeConfig: CreateRoomSizeConfig) {
    return this.httpService
      .post<RoomSize>("roomSizes", createRoomSizeConfig)
      .then((roomSize) => new RoomSize(roomSize));
  }

  update(updateRoomSizeConfig: UpdateRoomSizeConfig) {
    return this.httpService.put<RoomSize>("roomSizes", updateRoomSizeConfig)
    .then((roomSize) => new RoomSize(roomSize));
  }

  delete(deleteRoomSizeConfig: DeleteRoomSizeConfig): Promise<boolean> {
    return this.httpService.delete<boolean>("roomSizes", deleteRoomSizeConfig);
  }
}
