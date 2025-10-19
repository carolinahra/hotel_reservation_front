import { GuestController } from "@guest/controllers/guest.controller";
import { ReservationController } from "@reservation/controllers/reservation.controller";
import { RoomController } from "@room/controllers/room.controller";

abstract class Controller {
  // Move away from here
  abstract init(): Promise<void> | void;
}

type Routes = {
  [key: string]: Controller;
};

export const routes: Routes = {
  guests: GuestController,
  rooms: RoomController,
  reservations: ReservationController,
} as const;
// The 'as const' assertion here ensures that the 'routes' object is treated as a constant type,
// preventing any modifications to its structure or values.

export class Router {
  constructor(private routes: Routes) {}
  handle() {
    const path = window.location.pathname.slice(1); // Remove leading '/'

    const controllerClass = this.routes[path];

    if (!controllerClass) {
      console.error(`No controller found for path: ${path}`);
      return;
    }
    controllerClass.init();
  }
}

  