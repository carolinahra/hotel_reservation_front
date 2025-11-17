import { RoomController } from "@room/controllers/room.controller";
import { Controller } from "./controller";
import { ExtraServiceController } from "@extra-service/controllers/extra-service.controller";
import { BookingView } from "@shared/views/booking.view";
import { BookingService } from "@shared/services/booking.service";

export class BookingController extends Controller {
  constructor(
    private readonly extraServiceController: ExtraServiceController,
    private readonly view: BookingView,
    private readonly bookingService: BookingService
  ) {
    super();
  }
  public init(): Promise<void> | void {
    this.view.renderBookingForm();
    this.extraServiceController.initExtraServiceOptions("booking-form");
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFromInputs();
      this.bookingService.handle(inputs);
    });
  }
}
