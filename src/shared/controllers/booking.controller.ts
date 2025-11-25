import { RoomController } from "@room/controllers/room.controller";
import { Controller } from "./controller";
import { ExtraServiceController } from "@extra-service/controllers/extra-service.controller";
import { BookingView } from "@shared/views/booking.view";
import { BookingService } from "@shared/services/booking.service";
import { ExceptionController } from "./exception.controller";

export class BookingController extends Controller {
  constructor(
    private readonly extraServiceController: ExtraServiceController,
    private readonly view: BookingView,
    private readonly bookingService: BookingService,
    private readonly exceptionController: ExceptionController
  ) {
    super();
  }
  public async init(): Promise<void> {
    this.view.renderBookingForm();
    await this.extraServiceController.initExtraServiceOptions("booking-form");
    const recalculatePrice = () => {
      const inputs = this.view.readFromInputs();
      this.bookingService
        .getBookingPrice({
          roomsIDs: inputs.roomsId,
          extraServicesIDs: inputs.extraServiceIds,
          checkInDate: inputs.checkInDate,
          checkOutDate: inputs.checkOutDate,
        })
        .then((price) => this.view.renderPrice(price))
        .catch((error) => {
          console.log(error);
          this.exceptionController.init(error);
        });
    };

    this.view.bindPriceCalculation(recalculatePrice);

    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFromInputs();
      this.bookingService.handle(inputs);
    });
  }
}
