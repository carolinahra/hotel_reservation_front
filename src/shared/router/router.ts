import { ExtraServiceController } from "@extra-service/controllers/extra-service.controller";
import { GuestController } from "@guest/controllers/guest.controller";
import { ReservationDetailController } from "@reservation/controllers/reservation-detail.controller";
import { ReservationController } from "@reservation/controllers/reservation.controller";
import { RoomSizeController } from "@room/controllers/room-size.controlller";
import { RoomController } from "@room/controllers/room.controller";
import { Controller } from "@shared/controllers/controller";

export type Routes = {
  [key: string]: Controller;
};

// The 'as const' assertion here ensures that the 'routes' object is treated as a constant type,
// preventing any modifications to its structure or values.

export class Router {
  private routes: Routes;
  constructor(
    private activeRoutes: string[],
    private readonly roomController: RoomController,
    private readonly guestController: GuestController,
    private readonly roomSizeController: RoomSizeController,
    private readonly reservationController: ReservationController,
    private readonly reservationDetailController: ReservationDetailController,
    private readonly extraServiceController: ExtraServiceController
  ) {
    this.routes = {
      guests: this.guestController,
      rooms: this.roomController,
      roomSizes: this.roomSizeController,
      reservations: this.reservationController,
      reservationDetails: this.reservationDetailController,
      extraServices: this.extraServiceController,
    };
  }
  handle() {
    const path = window.location.hash.slice(2); // Remove leading '/'

    const controllerClass = this.routes[path];

    if (!controllerClass) {
      console.error(`No controller found for path: ${path}`);
      return;
    }
    controllerClass.init();
  }
}
